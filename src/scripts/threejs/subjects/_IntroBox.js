import * as THREE from 'three';
import { showIntroBox } from '../animate';

export default function IntroBox({ scene, camera, Cube, comma }) {
  const tempPosVector = new THREE.Vector3();
  const tempScaleVector = new THREE.Vector3();
  const IntroBox = new THREE.Group();
  IntroBox.name = 'introBox';

  const sideLength = Math.cbrt(Cube.group.children.length);
  const sliceLength = Math.pow(sideLength, 2);
  const toClone = Cube.group.children.slice(-sliceLength * 2, -sliceLength);

  scene.add(IntroBox);

  for (const cube of toClone) {
    const clone = cube.clone();
    cube.getWorldPosition(tempPosVector);
    cube.getWorldScale(tempScaleVector);

    IntroBox.add(clone);
    clone.position.set(tempPosVector.x, tempPosVector.y, tempPosVector.z);
    clone.scale.set(tempScaleVector.x, tempScaleVector.y, tempScaleVector.z);
    clone.userData.isClickable = false;
  }

  const animationTarget = {
    positions: { x: '+=7', y: '-=.25', z: '+=2' },
    scales: { x: 2.25, y: 2.5, z: 0.5 },
    commaPos: { x: '+=5', y: '-=.5', z: '+=2.5' },
    vertical: {
      scales: { x: 0.5, y: 2.25 },
      left: { x: '-=.35' },
      right: { x: '+=.35' },
    },
    horizontal: { scales: { x: 1.2, y: 0.75 } },
    perimeter: { interScales: { x: 1.5, y: 1.25, z: 0.5 } },
  };

  const callback = () => {
    const canvas = document.getElementById('canvas');
    const element = document.getElementById('introBox');

    const corners = {
      topRight: IntroBox.children[sliceLength - 2],
      topLeft: IntroBox.children[sliceLength - 2],
      bottomLeft: IntroBox.children[sideLength],
      bottomRight: IntroBox.children[sideLength * 2 - 2],
    };

    for (const corner of Object.values(corners)) {
      corner.updateWorldMatrix();
      corner.geometry.computeBoundingBox();
      corner.userData.tempWorldBounds = corner.geometry.boundingBox;

      for (const bounds of Object.values(corner.userData.tempWorldBounds)) {
        bounds.applyMatrix4(corner.matrixWorld);
        bounds.project(camera);
      }
    }

    const maxX = corners.bottomRight.userData.tempWorldBounds.max.x;
    const minX = corners.bottomLeft.userData.tempWorldBounds.max.x;
    const maxY = corners.topRight.userData.tempWorldBounds.min.y;
    const minY = corners.bottomRight.userData.tempWorldBounds.min.y;

    const left = (minX * 0.5 + 0.5) * canvas.clientWidth;
    const right = (maxX * 0.5 + 0.5) * canvas.clientWidth;
    const bottom = (minY * -0.5 + 0.5) * canvas.clientHeight - 8;
    const top = (maxY * -0.5 + 0.5) * canvas.clientHeight - 8;
    const width = right - left;
    const height = bottom - top;

    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `
      translate(${left}px, ${top}px) skew(0deg, -2deg)
    `;
  };

  showIntroBox(IntroBox, comma, animationTarget, callback);

  /* function mergeGeometry() {
    return new Promise(resolve => {
      const material = IntroBox.children[0].material;
      const mergedGeometry = new THREE.Geometry();
      for (const box of IntroBox.children) {
        mergedGeometry.merge(box.geometry, box.matrix);
      }
      const mesh = new THREE.Mesh(mergedGeometry, material);
      mergedGeometry.computeBoundingBox();
      IntroBox.clear();
      IntroBox.add(mesh);
      resolve(mesh);
    });
  }*/
}
