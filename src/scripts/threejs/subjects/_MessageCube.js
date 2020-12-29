import CubeCubes from './_CubeCubes';
import SpellHi from './_Hi';
import Comma from './_Comma';

export default function MessageCube({scene, configCubed}) {
  const Cube = new CubeCubes(configCubed);

  let comma = null;
  let message = SpellHi(Cube.facingPlane);
  let messageLoop = message.loopAnimation(() => messageLoopCallback());

  for (const cube of Cube.boxes) scene.add(cube);

  const sayHi = () => messageLoop.play();
  const onClick = (clickCounter, mesh) => clickHandler(clickCounter, mesh);

  return {
    sayHi,
    onClick,
  };

  function messageLoopCallback(nextMessage = null) {
    Cube.planeLoop(() => {
      message = nextMessage || SpellHi(Cube.getFacingPlane());
      messageLoop = message.loopAnimation(messageLoopCallback, comma);
      messageLoop.play();
    }).play();
  }

  async function addComma() {
    const position = {
      x: Cube.offsets[Cube.offsets.length - 1] + configCubed.spacing,
      y: Cube.offsets[0] - configCubed.spacing / 4,
      z: Cube.offsets[Cube.offsets.length - 1],
    };

    Comma(position)
      .then((mesh) => {
        comma = mesh;
        scene.add(comma);
        messageLoop.progress(0.5);
        messageLoop.progress(0);
        message.showComma(comma);
        messageLoop = message.loopAnimation(messageLoopCallback, comma);
        messageLoop.progress(0.5);
      }).catch((error) => console.error(error));
  }

  function clickHandler(clickCounter, intersectedMesh = null) {
    messageLoop.pause();

    if (intersectedMesh.object === message.iDot) {
      addComma();
      return;
    }

    const axis = clickCounter % 2 === 0 ? 'y' : 'x';
    const callback = () => messageLoop.resume();
    Cube.onClick(scene, intersectedMesh.object, axis, callback);
  }

}
