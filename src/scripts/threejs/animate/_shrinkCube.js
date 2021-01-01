import { gsap } from 'gsap';

export default function shrinkCube(scene, cube, comma, callback) {
  cube.group.add(comma);

  return gsap.timeline({
    paused: true,
    delay: 0.8,
    onComplete: () => callback(),
    defaults: {
      duration: 0.8,
      ease: 'power1',
    },
  }).to(cube.group.position, { y: '+=1.25' }, '<')
    .to(cube.group.scale, { x: 0.7, y: 0.7, z: 0.7 }, '<')
    .to(cube.group.position, { x: '-=4'}, '<.2')
    // .to(cube.group.rotation, { y: 0 }, '<')

    .call(() => {
      cube.group.updateWorldMatrix(true, true);
      scene.attach(comma);
      cube.group.remove(comma);
    });
}
