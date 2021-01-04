import * as THREE from 'three';
import { showIntroBox } from '../animate';

export default function IntroBox({ scene, camera }) {
  const mainCube = scene.getObjectByName('mainMessageCube');
  const sideLength = Math.cbrt(mainCube.children.length);
  const sliceLength = Math.pow(sideLength, 2);
  const IntroBox = new THREE.Group();
  IntroBox.name = 'introBox';

  initialize().then(loaded => scene.add(loaded));

  this.onResize = () => IntroBox.visible ? positionDOMElement() : null;

  function initialize(resolve) {
    return new Promise(resolve => {
      const toCopy = mainCube.children.slice(-sliceLength * 2, -sliceLength);
      for (const cube of toCopy) {
        const copy = new THREE.Mesh();
        copy.copy(cube);
        copy.userData.isClickable = false;
        copy.material = cube.material.clone();
        IntroBox.attach(copy);
      }

      IntroBox.visible = false;
      IntroBox.userData = {
        ...sortBoxes(),
        updatePositions,
        animateReveal,
      };

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

    return {
      perimeter,
      innerBoxes: boxes,
    };
  }

  function updatePositions() {
    return new Promise(resolve => {
      const tempPosVector = new THREE.Vector3();
      const tempScaleVector = new THREE.Vector3();
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

  function animateReveal() {
    const comma = scene.getObjectByName('messageComma');
    const animationTarget = {
      positions: { x: '+=7', y: '-=.25', z: '+=2' },
      scales: { x: 2.75, y: 3.75, z: 0.5 },
      commaPos: { x: '+=5.5', y: '-=.75', z: '+=2' },
      vertical: {
        leftPos: { x: '+=6.65', y: '-=.3', z: '+=2.25' },
        rightPos: { x: '+=7.35', y: '-=.3', z: '+=2.25'},
        scales: { x: 0.5, y: 3.75 },
      },
      horizontal: {
        topPos: { x: '+=7', y: '+=.75', z: '+=2.25' },
        bottomPos: { x: '+=7', y: '-=1.5', z: '+=2.25'},
        scales: { x: 1.2, y: 0.75 },
      },
      perimeter: { interScales: { x: 1.5, y: 1, z: 0.5 } },
    };

    const callback = () => mergeGeometry().then(() => positionDOMElement());

    updatePositions();
    showIntroBox(IntroBox, mainCube, comma, animationTarget, callback);
  }

  function positionDOMElement() {
    const canvas = document.getElementById('canvas');
    const element = document.getElementById('introBox');
    const target = IntroBox.getObjectByName('introBoxBG');
    target.updateWorldMatrix();
    target.geometry.computeBoundingBox();
    const boundingBox = target.geometry.boundingBox;
    boundingBox.max.project(camera);
    boundingBox.min.project(camera);

    const left = (boundingBox.min.x * 0.5 + 0.5) * canvas.clientWidth - 8;
    const right = (boundingBox.max.x * 0.5 + 0.5) * canvas.clientWidth - 8;
    const bottom = (boundingBox.min.y * -0.5 + 0.5) * canvas.clientHeight;
    const top = (boundingBox.max.y * -0.5 + 0.5) * canvas.clientHeight;
    const width = right - left;
    const height = bottom - top;

    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `
      translate(${left}px, ${top}px) skew(0deg, -1deg)
    `;
    element.children[0].style.opacity = 1;
  }

  function mergeGeometry() {
    return new Promise(resolve => {
      const objectArray = IntroBox.userData.innerBoxes;
      const material = objectArray[0].material;
      const mergedGeometry = new THREE.Geometry();
      for (const box of objectArray) {
        mergedGeometry.merge(box.geometry, box.matrix);
      }
      const mesh = new THREE.Mesh(mergedGeometry, material);
      mesh.name = 'introBoxBG';
      IntroBox.clear();
      IntroBox.userData.innerBoxes = [mesh];
      IntroBox.add(...IntroBox.userData.perimeter);
      IntroBox.add(mesh);
      resolve();
    });
  }
}
