import { DomComponent } from '@core/DomComponent';
import { $ } from '@core/dom';
import * as THREE from 'three';

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

  drawBox() {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.$root.getWidth(), this.$root.getHeight());
    this.$root.append($(renderer.domElement));

    // Определяем фигуру ================================================

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // https://threejsfundamentals.org/threejs/lessons/threejs-custom-geometry.html

    // const geometry = new THREE.Geometry();

    // geometry.vertices.push(
    //   new THREE.Vector3(-1, -1, 1),  // 0
    //   new THREE.Vector3(1, -1, 1),  // 1
    //   new THREE.Vector3(-1, 1, 1),  // 2
    //   new THREE.Vector3(1, 1, 1),  // 3
    //   new THREE.Vector3(-1, -1, -1),  // 4
    //   new THREE.Vector3(1, -1, -1),  // 5
    //   new THREE.Vector3(-1, 1, -1),  // 6
    //   new THREE.Vector3(1, 1, -1),  // 7
    // );

    // geometry.faces.push(
    //   // front
    //   new THREE.Face3(0, 3, 2),
    //   new THREE.Face3(0, 1, 3),
    //   // right
    //   new THREE.Face3(1, 7, 3),
    //   new THREE.Face3(1, 5, 7),
    //   // back
    //   new THREE.Face3(5, 6, 7),
    //   new THREE.Face3(5, 4, 6),
    //   // left
    //   new THREE.Face3(4, 2, 6),
    //   new THREE.Face3(4, 0, 2),
    //   // top
    //   new THREE.Face3(2, 7, 6),
    //   new THREE.Face3(2, 3, 7),
    //   // bottom
    //   new THREE.Face3(4, 1, 0),
    //   new THREE.Face3(4, 5, 1),
    // );

    // Настраиваем камеру ===============================================

    const fov = 75;
    const aspect = this.$root.getWidth() / this.$root.getHeight();
    const near = 0.1;
    const far = 100;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;

    // Запускаем анимацию ===============================================

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }

  init() {
    super.init();
    this.$on('ENTERED_SIZE', data => {
      console.log('Box View recieved sizes', data);
      this.drawBox();
    })
    this.drawBox();
  }
}