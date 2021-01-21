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
        each: 0.05,
        from: 'random',
        ease: 'back',
      },
      ease: 'back',
    },
  });

  /*tl.to(outgoingLights, { intensity: 0 })
    .set(outgoingLights, { visible: false }, '<')
    .to(outgoingProps.positions, { z: `-=${dBack}` }, '<.5')
    .to(othersProps.positions, { z: `+=${dForward}`, stagger: 0 }, '<')
    .set(incomingLights, { visible: true }, '<')
    .to(incomingLights, { intensity: .5 }, '<')

    .call(() => callback());*/

    tl.set(incomingLights, { visible: true })
      .to(outgoingProps.positions, { z: `-=${dBack}` })
      .to(outgoingLights, {intensity: 0 }, '<')
      .to(othersProps.positions, { z: `+=${dForward}`, stagger: 0 }, '<')
      .to(incomingLights, { intensity: 0.5 }, '<')
      .set(outgoingLights, { visible: false })
      .call(() => callback());

  return tl;
}
