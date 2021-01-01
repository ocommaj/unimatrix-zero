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
  }

  const animationTarget = {
    positions: { x: '+=6.5', z: '+=2' },
    commaPos: { x: '+=5', y: '-=.5', z: '+=2.5' },
    scales: { x: 1.2, y: 1.4, z: '.5' },
  };

  showIntroBox(IntroBox, comma, animationTarget);

}
