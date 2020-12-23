import { DomComponent } from '@core/DomComponent';
import { $ } from '@core/dom';
import * as THREE from 'three';
import { geometryFromSize } from './geometry';

export class BoxView extends DomComponent {
  static className = 'box-view';

  constructor($root, options) {
    super($root, {
      name: 'BoxView',
      ...options
    });
  }

  toHTML() {
    return '';
  }

  drawBox(vertices) {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.$root.getWidth(), this.$root.getHeight());
    this.$root.append($(renderer.domElement));

    // Define light ===================================================

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Define geometry ================================================

    const geometry = new THREE.Geometry();

    vertices.forEach(v => {
      geometry.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
    });

    for (let i = 0; i < vertices.length; i = i + 3) {
      geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));
    }

    geometry.computeFaceNormals();

    const material = new THREE.MeshPhongMaterial(0xFF4444);
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

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

  init() {
    super.init();
    this.$on('ENTERED_SIZE', data => {
      this.$root.clear();
      this.drawBox(geometryFromSize(data.length, data.width, data.height));
    })
  }
}