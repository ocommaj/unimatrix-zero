import * as THREE from 'three';
import Subjects from './subjects';

export default function SceneManager(canvas) {
  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const subjects = initSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setClearColor('#262626');
    renderer.setSize(width, height);

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspect = width / height;
    const fieldOfView = 60;
    const near = 1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView, aspect, near, far
    );

    camera.position.z = setZoom(width);
    //camera.position.x = -12
    camera.setZoom = setZoom;
    camera.maxZoom = maxZoom;

    function maxZoom(width) {
      if (width <= 370) return 17;
      if (width > 370 && width <= 800) return 15;
      if (width > 800 && width <= 1000) return 13;
      if (width > 1000) return 12;
    }

    function setZoom(width, zValue = null) {
      const maxZ = maxZoom(width);
      return (zValue && zValue <= maxZ) ? zValue : maxZ;
    }

    return camera;
  }

  function initSceneSubjects(scene) {
    const cubeConfig = { size: 1, rotation: { x: 0, y: 0, z: 0 } };
    const configCubed = { cubeConfig, count: 5, spacing: 1.5 };

    const hexLayer = Subjects.hexLayer(scene, camera);
    hexLayer.playLife();

    const messageCube = Subjects.messageCube({ scene, configCubed });
    messageCube.sayHi();

    return {
      hexLayer,
      messageCube,
      comma: Subjects.comma({ parent: scene }),
      introBox: Subjects.introBox({ scene, camera }),
      light: Subjects.generalLight(scene),
      imageBubble: Subjects.imageBubble(scene),
    };
  }

  this.imageBubble = {
    padi: {
      display: () => subjects.imageBubble.display(),
    },
  };

  this.update = () => {
    const elapsedTime = clock.getElapsedTime();
    const nowSecond = Math.round(elapsedTime);

    for (const subject of Object.values(subjects)) {
      if (subject.update) subject.update({ elapsedTime, nowSecond });
    }

    renderer.render(scene, camera);
  };

  this.onWindowResize = () => {
    const { width, height } = canvas;
    screenDimensions.width = width;
    screenDimensions.height = height;
    camera.aspect = width / height;
    camera.setZoom(width);
    camera.updateProjectionMatrix();
    subjects.introBox.onResize();
    renderer.setSize(width, height);
  };

  this.onClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (!intersects[0]) return;

    subjects.messageCube.onClick(intersects[0], camera);
    document.body.style.cursor = 'auto';
    return;
  };

  this.onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length && intersects[0].object.userData.isClickable) {
      document.body.style.cursor = 'pointer';
      return;
    }
    if (document.body.style.cursor === 'pointer') {
      document.body.style.cursor = 'auto';
    }
  };
}
