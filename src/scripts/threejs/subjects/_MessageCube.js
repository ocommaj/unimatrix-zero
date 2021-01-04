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

  const sayHi = () => messageLoop.play();
  const onClick = clickHandler;

  return {
    sayHi,
    onClick,
  };

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

  function clickHandler(clickCounter, intersectedMesh, camera) {
    messageLoop.pause();
    if (intersectedMesh.object === message.iDot) {
      const callback = () => {
        const IntroBox = scene.getObjectByName('introBox');
        IntroBox.userData.updatePositions()
          .then(() => IntroBox.userData.animateReveal());
      };

      addComma().then(() => shrinkCube(scene, Cube, comma, callback).play());

      return;
    }

    const axis = clickCounter % 2 === 0 ? 'y' : 'x';
    const callback = () => messageLoop.resume();
    Cube.onClick(scene, intersectedMesh.object, axis, callback);
  }

}
