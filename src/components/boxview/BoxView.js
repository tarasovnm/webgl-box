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

    // Define geometry ================================================

    const geometry = new THREE.Geometry();

    vertices.forEach(v => {
      geometry.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
    });

    /*
      6----7
     /|   /|
    2----3 |
    | |  | |
    | 4--|-5
    |/   |/
    0----1
    */

    geometry.faces.push(
      // front
      new THREE.Face3(0, 3, 2),
      new THREE.Face3(0, 1, 3),
      // right
      new THREE.Face3(1, 7, 3),
      new THREE.Face3(1, 5, 7),
      // back
      new THREE.Face3(5, 6, 7),
      new THREE.Face3(5, 4, 6),
      // left
      new THREE.Face3(4, 2, 6),
      new THREE.Face3(4, 0, 2),
      // top
      new THREE.Face3(2, 7, 6),
      new THREE.Face3(2, 3, 7),
      // bottom
      new THREE.Face3(4, 1, 0),
      new THREE.Face3(4, 5, 1),
    );

    geometry.faces[0].color = geometry.faces[1].color = new THREE.Color('red');
    geometry.faces[2].color = geometry.faces[3].color = new THREE.Color('yellow');
    geometry.faces[4].color = geometry.faces[5].color = new THREE.Color('green');
    geometry.faces[6].color = geometry.faces[7].color = new THREE.Color('cyan');
    geometry.faces[8].color = geometry.faces[9].color = new THREE.Color('blue');
    geometry.faces[10].color = geometry.faces[11].color = new THREE.Color('magenta');

    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Create camera ===============================================

    const fov = 75;
    const aspect = this.$root.getWidth() / this.$root.getHeight();
    const near = 0.1;
    const far = 100;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 15;
    cube.rotation.x = 0.5;
    cube.rotation.y = 0.5;

    // Animate =====================================================

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
      this.drawBox(geometryFromSize(data.lenght, data.width, data.height));
    })
  }
}