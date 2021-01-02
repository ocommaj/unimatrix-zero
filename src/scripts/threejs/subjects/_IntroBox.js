import * as THREE from 'three';
import { showIntroBox } from '../animate';

export default function IntroBox({ scene, camera, Cube, comma }) {
  const tempPosVector = new THREE.Vector3();
  const tempScaleVector = new THREE.Vector3();
  const IntroBox = new THREE.Group();
  IntroBox.name = 'introBox';

  const sliceLength = Math.pow(Math.cbrt(Cube.group.children.length), 2);
  const toClone = Cube.group.children.slice(-sliceLength * 2, -sliceLength);

  scene.attach(IntroBox);

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
    mergeGeometry().then(() => console.dir(IntroBox.children[0].geometry));

  };

  showIntroBox(IntroBox, comma, animationTarget, callback);

  function mergeGeometry() {
    return new Promise(resolve => {
      const material = IntroBox.children[0].material;
      const mergedGeometry = new THREE.Geometry();
      for (const box of IntroBox.children) {
        box.updateWorldMatrix(true, true);
        mergedGeometry.merge(box.geometry, box.matrix);
      }
      const mesh = new THREE.Mesh(mergedGeometry, material);
      mesh.rotateY(-0.2);
      mergedGeometry.computeBoundingBox();
      IntroBox.clear();
      IntroBox.attach(mesh);
      resolve();
    });
  }
}
