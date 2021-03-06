import * as axios from "axios";
import {DomComponent} from '@core/DomComponent';
import {$} from '@core/dom';
import * as THREE from 'three';

export class BoxView extends DomComponent {
  static className = 'box-view';

  constructor($root, options) {
    super($root, {
      name: 'BoxView',
      ...options
    });

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();

    this.objectsToDispose = [];
    this.objectsToRemove = [];
  }

  toHTML() {
    return '';
  }

  drawBox(triangles) {
    const scene = this.scene;
    const renderer = this.renderer;

    this.renderer.setSize(this.$root.getWidth(), this.$root.getHeight());
    this.$root.append($(renderer.domElement));

    // Define light ===================================================

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Define geometry ================================================

    const geometry = new THREE.Geometry();

    triangles.forEach(triangle => {
      triangle.forEach(v => {
        geometry.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
      })
    });

    for (let i = 0; i < triangles.length * 3; i = i + 3) {
      geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));
    }

    geometry.computeFaceNormals();

    const material = new THREE.MeshPhongMaterial(0xFF4444);
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    this.objectsToRemove.push(light);
    this.objectsToRemove.push(cube);

    this.objectsToDispose.push(renderer.renderLists);
    this.objectsToDispose.push(renderer);
    this.objectsToDispose.push(geometry);
    this.objectsToDispose.push(material);

    // Create camera ==================================================

    const fov = 75;
    const aspect = this.$root.getWidth() / this.$root.getHeight();
    const near = 0.1;
    const far = 100;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 15;
    cube.rotation.x = 0.5;
    cube.rotation.y = 0.5;

    // Animate ========================================================

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }

  clearScene() {
    for (let obj of this.objectsToDispose) {
      obj.dispose();
    }

    for (let obj of this.objectsToRemove) {
      this.scene.remove(obj);
      obj = null;
    }
  }

  init() {
    super.init();
    this.$on('ENTERED_SIZE', data => {

      axios.post(`https://webgl1.herokuapp.com/setSizes`, data, {
        headers: {'Access-Control-Allow-Origin': '*'}
      }).then(_ => {
        axios.get(`https://webgl1.herokuapp.com/triangles`, {
          headers: {'Access-Control-Allow-Origin': '*'}
        }).then(response => {
          this.clearScene();
          this.$root.clear();
          this.drawBox(response.data.vectors);
        })
      });
    })
  }
}