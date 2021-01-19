import { Group, Mesh, Vector3 } from 'three';
import { showIntroBox } from '../../animate';
import animationTargets from './_animationTargets';
import mergeGeometry from './_mergeGeometry';
import positionDOMElement from './_positionDOMElement';

export default function IntroBox({ scene, camera }) {
  const mainCube = scene.getObjectByName('mainMessageCube');
  const sideLength = Math.cbrt(mainCube.children.length);
  const sliceLength = Math.pow(sideLength, 2);
  const IntroBox = new Group();
  IntroBox.name = 'introBox';

  initialize().then(loaded => scene.add(loaded));

  this.meshGroup = IntroBox;
  this.onResize = resizeHandler;
  this.reveal = reveal;

  function initialize(resolve) {
    return new Promise(resolve => {
      const toCopy = mainCube.children.slice(-sliceLength * 2, -sliceLength);
      for (const cube of toCopy) {
        const copy = new Mesh();
        copy.copy(cube);
        copy.userData.isClickable = false;
        copy.material = cube.material.map(material => {
          const clone = material.clone();
          clone.transparent = false;
          return clone;
        });
        IntroBox.attach(copy);
      }

      IntroBox.visible = false;
      IntroBox.userData = { ...sortBoxes() };

      resolve(IntroBox);
    });
  }

  function sortBoxes() {
    const boxes = [...IntroBox.children];
    const filtered = boxes.filter((_, i) => {
      return (
        i <= sideLength
        || i >= boxes.length - sideLength
        || !(i % sideLength)
        || !((i + 1) % sideLength)
      );
    });

    const perimeter = filtered.map(box => {
      return boxes.splice(boxes.indexOf(box), 1).pop();
    });
    const horizontal = perimeter.slice(0, sideLength);
    horizontal.push(...perimeter.slice(perimeter.length - sideLength));
    const vertical = perimeter.filter(box => !horizontal.includes(box));

    const sides = {
      inner: boxes,
      bottom: horizontal.slice(0, sideLength),
      top: horizontal.slice(horizontal.length - sideLength),
      left: vertical.filter((_, i) => !(i % 2)),
      right: vertical.filter((_, i) => (i % 2)),
    };

    const midpoints = Object.keys(sides).reduce((sides, key) => {
      const mesh = sides[key].splice(Math.floor(sides[key].length / 2), 1)[0];
      mesh.name = `perimeter mid${key.toUpperCase()}`;
      mesh.children[0].visible = true;
      mesh.children[0].intensity = 1;
      sides[key] = mesh;
      return sides;
    }, { ...sides });

    return { sides, midpoints };
  }

  function reveal() {
    updatePositions().then(() => animateReveal());
  }

  function updatePositions() {
    return new Promise(resolve => {
      const tempPosVector = new Vector3();
      const tempScaleVector = new Vector3();
      const toMatch = mainCube.children.slice(-sliceLength * 2, -sliceLength);

      for (let i = 0; i < toMatch.length; i++) {
        toMatch[i].getWorldPosition(tempPosVector);
        toMatch[i].getWorldScale(tempScaleVector);
        IntroBox.children[i].position.set(
          tempPosVector.x, tempPosVector.y, tempPosVector.z
        );
        IntroBox.children[i].scale.set(
          tempScaleVector.x, tempScaleVector.y, tempScaleVector.z
        );
      }
      IntroBox.visible = true;
      resolve();
    });
  }

  function resizeHandler() {
    if (IntroBox.visible) positionDOMElement(IntroBox, camera);
  }

  function animateReveal() {
    const { deviceType } = scene.userData;
    const target = { deviceType, ...animationTargets[deviceType] };
    const comma = scene.getObjectByName('messageComma');
    const callback = () => {
      IntroBox.userData.deviceType = deviceType;
      mergeGeometry(IntroBox).then(() => positionDOMElement(IntroBox, camera));
    };

    const anim = showIntroBox(IntroBox, mainCube, comma, target, callback);
    updatePositions().then(() => anim.play());
  }
}
