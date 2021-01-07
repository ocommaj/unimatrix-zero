import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default function facingToBack({
  facingPlane, others, dBack, dForward, callback,
}) {
  const tl = gsap.timeline({
    paused: true,
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
  const outgoingLights = facingPlane.map(cube => cube.userData.innerLight);
  const incomingLights = others.slice(-facingPlane.length)
    .map(cube => cube.userData.innerLight);

  tl.to(outgoingProps.positions, { z: `-=${dBack}` })
    .to(outgoingLights, {intensity: 0 }, '<')
    .to(othersProps.positions, { z: `+=${dForward}` }, '<')
    .to(incomingLights, { intensity: 0.7 }, '<')
    .then(() => callback());

  return tl;
}
