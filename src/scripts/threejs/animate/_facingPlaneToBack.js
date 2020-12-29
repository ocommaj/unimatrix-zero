import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default function facingToBack({
  facingPlane, others, dBack, dForward, callback,
}) {
  const tl = gsap.timeline({
    paused: true,
    // repeat: -1,
    // repeatDelay: 1.4,
    defaults: {
      duration: 1,
      stagger: {
        each: 0.02,
        from: 'random',
        ease: 'back',
      },
      ease: 'back',
    },
  });

  const outgoingProps = meshAnimationProperties(facingPlane);
  const othersProps = meshAnimationProperties(others);

  tl.to(outgoingProps.positions, { z: `-=${dBack}` })
    .to(othersProps.positions, { z: `+=${dForward}` }, '<')
    .then(() => callback());

  return tl;
}
