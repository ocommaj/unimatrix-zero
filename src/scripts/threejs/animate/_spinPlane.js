import { gsap } from 'gsap';

export default function spinPlane({scene, sliceClone, axis }) {
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: 'power1',
    },
    onComplete: () => scene.remove(sliceClone),
  }).to(sliceClone.rotation, { [axis]: 6.28 });

  return tl;
}
