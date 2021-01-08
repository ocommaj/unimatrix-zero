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
        copy.material = cube.material.map(material => {
          const clone = material.clone();
          clone.transparent = false;
          return clone;
        });
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
    const target = {
      positions: { x: '+=7', y: '-=.25', z: '+=2' },
      scales: { x: 2.75, y: 4, z: 0.5 },
      comma: {
        pos: { x: '+=5.25', y: '-=.75', z: '+=2.1' },
      },
      vertical: {
        leftPos: { x: '+=6.65', y: '-=.3', z: '+=2.25' },
        rightPos: { x: '+=7.35', y: '-=.3', z: '+=2.25'},
        scales: { x: 0.5, y: 3.75 },
      },
      horizontal: {
        topPos: { x: '+=7', y: '+=.75', z: '+=2.25' },
        bottomPos: { x: '+=7', y: '-=1.5', z: '+=2.25'},
        scales: { x: 5.4, y: 0.75 },
      },
    };

    const comma = scene.getObjectByName('messageComma');
    const callback = () => mergeGeometry().then(() => positionDOMElement());
    const animate = showIntroBox(IntroBox, mainCube, comma, target, callback);

    updatePositions().then(() => animate.play());
  }

  function positionDOMElement() {
    const canvas = document.getElementById('canvas');
    const element = document.getElementById('introBox');
    const target = IntroBox.getObjectByName('introBoxBG');
    target.geometry.computeBoundingBox();

    const boundingBox = target.geometry.boundingBox;
    boundingBox.max.project(camera);
    boundingBox.min.project(camera);

    const left = (boundingBox.min.x * 0.5 + 0.55) * canvas.clientWidth;
    const right = (boundingBox.max.x * -0.5 + 0.55) * canvas.clientWidth;
    const bottom = (boundingBox.min.y * 0.5 + 0.15) * canvas.clientHeight;
    const top = (boundingBox.max.y * -0.5 + 0.15) * canvas.clientHeight;
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
      const rad = 4.8;
      const height = 6;
      const radialSeg = 64;
      const heightSeg = 6;
      const openEnd = true;
      const thetaStart = 5.75;
      const thetaLength = 1;
      const tempPosVector = new THREE.Vector3();
      const geometry = new THREE.CylinderGeometry(
        rad, rad, height, radialSeg, heightSeg, openEnd, thetaStart, thetaLength
      );

      const mesh = new THREE.Mesh();
      const midpoint = IntroBox.userData.midpoints.inner;
      const material = midpoint.material[4].clone();
      midpoint.getWorldPosition(tempPosVector);
      mesh.copy(midpoint);
      IntroBox.userData.midpoints.inner = null;
      IntroBox.remove(midpoint)
      mesh.clear();
      mesh.scale.set(4.5, 6, 0.1);
      mesh.position.set(
        tempPosVector.x + 0.25,
        tempPosVector.y,
        tempPosVector.z);
      const cylinderMesh = new THREE.Mesh(geometry, material);
      cylinderMesh.name = 'introBoxDrum';
      cylinderMesh.position.set(
        tempPosVector.x + 0.6,
        tempPosVector.y,
        tempPosVector.z - 4.7);

      mesh.name = 'introBoxBG';
      mesh.updateMatrix();
      mesh.material.transparent = true;
      mesh.material.opacity = 0;
      mesh.visible = false;
      cylinderMesh.material.transparent = true;
      cylinderMesh.material.opacity = 0.6;
      IntroBox.userData.midpoints.inner = mesh;

      IntroBox.clear();
      IntroBox.add(cylinderMesh);
      IntroBox.add( ...Object.values(IntroBox.userData.midpoints) );
      resolve();
    });
  }
}
