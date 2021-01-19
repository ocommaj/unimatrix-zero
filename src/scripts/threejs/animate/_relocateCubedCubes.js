import { gsap } from 'gsap';

export default function relocateCubedCubes(args) {
  const {
    meshGroup,
    onStart,
    afterMove,
    onComplete,
    target: { duration, positions, rotations, scales, timing }
  } = args;

  const tl = gsap.timeline({
    paused: true,
    delay: 1.4,
    onStart: () => onStart(),
    onComplete: () => onComplete(),
    defaults: {
      duration: duration,
      ease: 'power1',
    },
  })

  tl.to(meshGroup.position, { ...positions[0] }, timing.positions[0])
    .to(meshGroup.rotation, { ...rotations }, '<')
    .to(meshGroup.scale, { ...scales[0] }, timing.scales[0])
    .to(meshGroup.position, { ...positions[1] }, timing.positions[1])
    .set(meshGroup.rotation, { x: 0, y: 0, z: 0 })
    .call(() => afterMove());

  return tl
}
