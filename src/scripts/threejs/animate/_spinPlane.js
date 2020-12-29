import { gsap } from 'gsap';
import { Group } from 'three';

export default function spinPlane({ scene, slice, axis }) {
  const spinGroup = new Group();
  scene.add(spinGroup);

  for (const box of slice) {
    const clone = box.clone();
    clone.scale.set(1, 1, 1);
    spinGroup.add(clone);
    box.visible = false;
  }

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: 'power1',
    },
    onComplete: () => {
      for (const box of slice) box.visible = true;
      scene.remove(spinGroup);
    },
  }).to(spinGroup.rotation, { [axis]: 6.832 });

  return tl;
}
