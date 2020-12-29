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
  const sceneSubjects = initSceneSubjects(scene);

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
    renderer.setClearColor('#525252');
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

    setZoom(width);
    camera.setZoom = (width) => setZoom(width);

    function setZoom(width) {
      if (width <= 370) camera.position.z = 17;
      if (width > 370 && width <= 800) camera.position.z = 15;
      if (width > 800 && width <= 1000) camera.position.z = 13;
      if (width > 1000) camera.position.z = 12;
    }

    return camera;
  }

  function initSceneSubjects(scene) {
    const cubeConfig = { size: 1, rotation: { x: 0, y: 0, z: 0 } };
    const configCubed = { cubeConfig, count: 5, spacing: 1.5 };

    const messageCube = Subjects.messageCube({ scene, configCubed });
    messageCube.sayHi();

    return {
      cube: messageCube,
      light: Subjects.generalLight(scene),
    };
  }

  this.update = () => {
    const elapsedTime = clock.getElapsedTime();
    for (const subject of Object.values(sceneSubjects)) {
      if (subject.update) subject.update(elapsedTime);
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
    renderer.setSize(width, height);
  };

  this.onClick = (event, clickCounter) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (!intersects[0]) return clickCounter;

    sceneSubjects.cube.onClick(clickCounter, intersects[0]);
    clickCounter++;

    return clickCounter;
  };
}
