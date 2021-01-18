import CubedCubes from './CubedCubes';
import SpellHi from './_Hi';
import { showComma } from '../animate';

export default function MessageCube({scene, configCubed}) {
  const Cube = new CubedCubes(configCubed);
  Cube.meshGroup.name = 'mainMessageCube';

  let comma = null;
  let message = SpellHi(Cube.facingPlane);
  let messageLoop = message.animate.loop(() => messageLoopCallback());
  scene.add(Cube.meshGroup);
  // Cube.meshGroup.visible = false;

  this.meshGroup = Cube.meshGroup;
  this.onClick = clickHandler;
  this.punchThroughBG = (bgGeo) => Cube.wrapBackgroundGeometry(bgGeo);
  this.sayHi = () => messageLoop.play();

  function messageLoopCallback(nextMessage = null) {
    Cube.planeLoop(() => {
      const facing = Cube.getFacingPlane();
      message = SpellHi(facing);
      messageLoop = message.animate.loop(messageLoopCallback);
      messageLoop.play();
    }).play();
  }

  function addComma() {
    const coordinates = {
      x: Cube.offsets[Cube.offsets.length - 1] + configCubed.spacing,
      y: Cube.offsets[0] - configCubed.spacing / 4,
      z: Cube.offsets[Cube.offsets.length - 1],
    };

    return new Promise((resolve) => {
      const { deviceType, camera } = scene.userData;
      comma = scene.getObjectByName('messageComma');
      comma.position.set(coordinates.x, coordinates.y, coordinates.z);
      messageLoop.progress(0.5);
      messageLoop.progress(0);
      showComma({ comma, deviceType, camera });
      messageLoop = message.animate.loop(messageLoopCallback);
      messageLoop.progress(0.5);
      resolve();
    });
  }

  function clickHandler(intersectedMesh, camera) {
    messageLoop.pause();
    if (intersectedMesh.object === message.iDot) {
      const { deviceType } = scene.userData;
      const { geometry: bgGeometry } = scene.userData.subjects.hexLayer.mesh;
      const onStart = () => {
        this.update = () => Cube.wrapBackgroundGeometry(bgGeometry);
        Cube.meshGroup.add(comma);
      };
      const afterMove = () => {
        scene.attach(comma);
        Cube.meshGroup.remove(comma);
        Cube.meshGroup.updateWorldMatrix(true, true);
        this.update = null;
      };
      const showIntroBox = () => {
        const IntroBox = scene.userData.subjects.introBox;
        IntroBox.reveal();
      };

      const args = { deviceType, onStart, afterMove, onComplete: showIntroBox };
      addComma().then(() => Cube.moveAndShrink(args));

      return;
    }

    const callback = () => messageLoop.resume();
    Cube.onClick(scene, intersectedMesh.object, callback);
  }

}
