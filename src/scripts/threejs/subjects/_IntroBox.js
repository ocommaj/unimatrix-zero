import * as THREE from 'three';
import { showIntroBox } from '../animate';

export default function IntroBox({ scene, camera, messageCube }) {
  const tempPosVector = new THREE.Vector3();
  const tempScaleVector = new THREE.Vector3();
  const IntroBox = new THREE.Group();
  IntroBox.name = 'introBox';

  const sliceLength = Math.pow(Math.cbrt(messageCube.children.length), 2);
  const cloneTargets = messageCube.children.splice(
    -sliceLength * 2, sliceLength);

  scene.attach(IntroBox);

  for (const cube of cloneTargets) {
    const clone = cube.clone();
    cube.getWorldPosition(tempPosVector);
    cube.getWorldScale(tempScaleVector);

    IntroBox.add(clone);
    clone.position.set(tempPosVector.x, tempPosVector.y, tempPosVector.z);
    clone.scale.set(tempScaleVector.x, tempScaleVector.y, tempScaleVector.z);

    messageCube.children.unshift(cube);
  }

  const animationTarget = {
    positions: { x: '+=7.5', y: '-=.5', z: '+=2' },
    scales: { x: 1.2, y: 1.4, z: '.5' },

  };

  showIntroBox(IntroBox, animationTarget);


}
