import {
  Clock, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer,
} from 'three';
import { Interaction } from 'three.interaction';
import Subjects from './subjects';

export default function SceneManager({ canvas, device }) {
  const clock = new Clock();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const subjects = initSceneSubjects(scene);
  const interaction = new Interaction(renderer, scene, camera);
  scene.userData.subjects = subjects;
  scene.userData.camera = camera;
  // console.dir(camera)
  // console.dir(scene)

  function buildScene() {
    const scene = new Scene();
    scene.userData.device = device;
    scene.userData.deviceType = device.type;
    scene.userData.devicePixelRatio = device.devicePixelRatio;
    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true });
    const DPR = device.devicePixelRatio;
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
    const camera = new PerspectiveCamera(
      fieldOfView, aspect, near, far
    );

    camera.position.z = setZoom(width);
    camera.position.y = device.type === 'mobile' ? -1 : 0;
    camera.setZoom = setZoom;
    camera.maxZoom = maxZoom;
    //console.dir(camera.position.z)

    function maxZoom(width) {
      const DPR = device.devicePixelRatio;
      if (width <= 413 && DPR > 2) return 18;
      if (width >= 413 && width <= 760 && DPR > 2) return 17.5;
      if (width <= 420 && device.devicePixelRatio <= 2) return 17;
      if (width > 420 && width <= 800) return 16;
      if (width > 800) return 12;
    }

    function setZoom(width, zValue = null) {
      const maxZ = maxZoom(width);
      return (zValue && zValue <= maxZ) ? zValue : maxZ;
    }

    return camera;
  }

  function initSceneSubjects(scene) {
    const cubeConfig = { size: 1 };
    const configCubed = { cubeConfig, count: 5, spacing: 1.5 };
    const hexLayer = Subjects.hexLayer(scene, camera);
    hexLayer.playLife();

    const messageCube = Subjects.messageCube({ scene, configCubed });
    messageCube.sayHi();
    messageCube.punchThroughBG(hexLayer.mesh.geometry);

    const introBox = Subjects.introBox({ scene, camera });
    //const hollowEarth = Subjects.hollowEarth({ scene, camera })

    return {
      hexLayer,
      messageCube,
      introBox,
      comma: Subjects.comma({ parent: scene }),
      light: Subjects.generalLight(scene),
      imageBubble: Subjects.imageBubble(scene),
    };
  }

  this.imageBubble = {
    animateReveal: (key) => subjects.imageBubble.animateReveal(key),
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
    mouse.x = (event.clientX / canvas.offsetWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.offsetHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (!intersects[0]) return;

    subjects.messageCube.onClick(intersects[0], camera);
    document.body.style.cursor = 'auto';
    return;
  };

  this.onMouseMove = (event) => {
    mouse.x = (event.clientX / canvas.offsetWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.offsetHeight) * 2 + 1;
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
