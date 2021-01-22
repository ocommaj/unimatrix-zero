import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default function facingToBack({
  facingPlane, others, dBack, dForward, callback
}) {

  const outgoingProps = meshAnimationProperties(facingPlane);
  const othersProps = meshAnimationProperties(others);

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 1,
      stagger: {
        each: 0.05,
        from: 'random',
        ease: 'back',
      },
      ease: 'back',
    },
  });

    tl.to(outgoingProps.positions, { z: `-=${dBack}` })
      .to(othersProps.positions, { z: `+=${dForward}`, stagger: 0 }, '<')
      .call(() => callback());

  return tl;
}
