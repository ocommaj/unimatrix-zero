import { gsap } from 'gsap';

export default function relocateCubedCubes(args) {
  const {
    meshGroup,
    target,
    onStart,
    afterMove,
    onComplete,
  } = args;

  return gsap.timeline({
    paused: true,
    delay: 0.8,
    onStart: () => onStart(),
    onComplete: () => onComplete(),
    defaults: {
      duration: 0.8,
      ease: 'power1',
    },
  })
    // .to(meshGroup.position, { y: '+=1' }, '<')
    .to(meshGroup.position,
      { ...target.positions[0] },
      target.timing.positions[0])
    // .to(meshGroup.scale, { x: 0.7, y: 0.7, z: 0.7 }, '<')
    .to(meshGroup.scale, { ...target.scales[0] }, target.timing.scales[0])
    // .to(meshGroup.position, { x: '-=4.25'}, '<.2')
    .to(meshGroup.position,
      { ...target.positions[1] },
      target.timing.positions[1])
    .call(() => afterMove());
}