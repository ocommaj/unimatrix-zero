import CubeCubes from './_CubeCubes';
import SpellHi from './_Hi';
import Comma from './_Comma';
import { cameraZoomOut } from '../animate';

export default function MessageCube({scene, configCubed}) {
  const Cube = CubeCubes(configCubed);

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
      messageLoop = message.loopAnimation(messageLoopCallback, comma);
      messageLoop.play();
    }).play();
  }

  function addComma() {
    const position = {
      x: Cube.offsets[Cube.offsets.length - 1] + configCubed.spacing,
      y: Cube.offsets[0] - configCubed.spacing / 4,
      z: Cube.offsets[Cube.offsets.length - 1],
    };

    return new Promise((resolve) => {
      Comma(position)
        .then((mesh) => {
          comma = mesh;
          scene.add(comma);
          messageLoop.progress(0.5);
          messageLoop.progress(0);
          message.showComma(comma);
          messageLoop = message.loopAnimation(messageLoopCallback, comma);
          messageLoop.progress(0.5);
          resolve();
        }).catch((error) => console.error(error));
    });
  }

  function clickHandler(clickCounter, intersectedMesh, camera) {
    messageLoop.pause();

    if (intersectedMesh.object === message.iDot) {
      addComma()
        .then(() => cameraZoomOut(camera, { y: '-=1.5', z: '+=3' }));
      return;
    }

    const axis = clickCounter % 2 === 0 ? 'y' : 'x';
    const callback = () => messageLoop.resume();
    Cube.onClick(scene, intersectedMesh.object, axis, callback);
  }

}
