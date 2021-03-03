import CubedCubes from './CubedCubes';
import SpellHi from './_Hi';
import { showComma } from '../animate';

export default function MessageCube({scene, configCubed}) {
  const Cube = new CubedCubes(configCubed);
  Cube.meshGroup.name = 'mainMessageCube';

  let loopCount = 0;
  let comma = null;
  let facingPlane = Cube.getFacingPlane()
  let message = SpellHi(facingPlane);
  let messageLoop = message.animate.loop(() => messageLoopCallback());
  scene.add(Cube.meshGroup);

  this.messageCubeToIntroBox = messageCubeToIntroBox;
  this.timedDisplayIntroBox = timedDisplayIntroBox;
  this.meshGroup = Cube.meshGroup;
  this.onClick = clickHandler;
  this.punchThroughBG = (bgGeo) => Cube.wrapBackgroundGeometry(bgGeo);
  this.sayHi = () => messageLoop.play();
  this.update = (args) => this.timedDisplayIntroBox(args);

  function timedDisplayIntroBox({ nowSecond }) {
    console.log('firing')
    console.log(nowSecond)

    if (nowSecond === 6) {
      this.update = null;
      messageLoop.pause()
      this.messageCubeToIntroBox()
    }
  }

  function messageLoopCallback(nextMessage = null) {

    Cube.planeLoop(() => {
      facingPlane = Cube.getFacingPlane();
      message = SpellHi(facingPlane);
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
    if (intersectedMesh.object === message.iDot
        && !scene.userData.introBoxShows) {
        this.messageCubeToIntroBox()
        return;
      }

    const callback = () => messageLoop.resume();
    if (intersectedMesh.object !== message.iDot) {
      Cube.onClick(scene, intersectedMesh.object, callback);
    }
  }

  function messageCubeToIntroBox() {
    const { device } = scene.userData;
    const { geometry: bgGeometry } = scene.userData.subjects.hexLayer.mesh;
    const onStart = () => {
      this.update = () => Cube.wrapBackgroundGeometry(bgGeometry);
      Cube.meshGroup.add(comma);
    };
    const afterMove = () => {
      scene.attach(comma);
      Cube.meshGroup.remove(comma);
      Cube.meshGroup.updateMatrix()
      Cube.meshGroup.updateWorldMatrix(true, false);
      this.update = null;
    };
    const showIntroBox = () => {
      const IntroBox = scene.userData.subjects.introBox;
      IntroBox.reveal();
    };

    const args = { device, onStart, afterMove, onComplete: showIntroBox };
    addComma().then(() => Cube.moveAndShrink(args));
  }
}
