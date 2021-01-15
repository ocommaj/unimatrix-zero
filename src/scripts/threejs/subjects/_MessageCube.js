import CubeCubes from './_CubeCubes';
import SpellHi from './_Hi';
import { shrinkCube } from '../animate';

export default function MessageCube({scene, configCubed}) {
  const Cube = CubeCubes(configCubed);
  Cube.group.name = 'mainMessageCube';

  let comma = null;
  let message = SpellHi(Cube.facingPlane);
  let messageLoop = message.loopAnimation(() => messageLoopCallback());
  scene.add(Cube.group);
  // Cube.group.visible = false;

  this.meshGroup = Cube.group;
  this.onClick = clickHandler;
  this.punchThroughBG = (bgGeo) => Cube.wrapBackgroundGeometry(bgGeo);
  this.sayHi = () => messageLoop.play();

  function messageLoopCallback(nextMessage = null) {
    Cube.planeLoop(() => {
      const facing = Cube.getFacingPlane();
      message = SpellHi(facing);
      messageLoop = message.loopAnimation(messageLoopCallback);
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
      comma = scene.getObjectByName('messageComma');
      comma.position.set(coordinates.x, coordinates.y, coordinates.z);
      messageLoop.progress(0.5);
      messageLoop.progress(0);
      message.showComma(comma);
      messageLoop = message.loopAnimation(messageLoopCallback);
      messageLoop.progress(0.5);
      resolve();
    });
  }

  function clickHandler(intersectedMesh, camera) {
    messageLoop.pause();
    if (intersectedMesh.object === message.iDot) {
      const { geometry: bgGeometry } = scene.userData.subjects.hexLayer.mesh;
      let update = () => Cube.wrapBackgroundGeometry(bgGeometry);
      this.update = update;
      const callback = () => {
        update = null;
        const IntroBox = scene.userData.subjects.introBox;
        IntroBox.updatePositions().then(() => IntroBox.animateReveal());
        console.dir(this.update);
      };

      addComma().then(() => shrinkCube(scene, Cube, comma, callback).play());

      return;
    }

    const callback = () => messageLoop.resume();
    Cube.onClick(scene, intersectedMesh.object, callback);
  }

}
