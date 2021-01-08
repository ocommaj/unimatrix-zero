import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default function facingToBack({
  facingPlane, others, dBack, dForward, callback,
}) {

  const outgoingProps = meshAnimationProperties(facingPlane);
  const othersProps = meshAnimationProperties(others);
  const outgoingLights = facingPlane.map(cube => cube.children[0]);
  const incomingLights = others.slice(-facingPlane.length)
    .map(cube => cube.children[0]);

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

  tl.set(incomingLights, { visible: true })
    .to(outgoingProps.positions, { z: `-=${dBack}` })
    .to(outgoingLights, {intensity: 0 }, '<')
    .to(othersProps.positions, { z: `+=${dForward}` }, '<')
    .to(incomingLights, { intensity: 0.7 }, '<')
    .set(outgoingLights, { visible: false })
    .then(() => callback());

  return tl;
}
