import { gsap } from 'gsap';

export default function shrinkCube(scene, cube, comma, callback) {
  cube.meshGroup.add(comma);

  return gsap.timeline({
    paused: true,
    delay: 0.8,
    onComplete: () => callback(),
    defaults: {
      duration: 0.8,
      ease: 'power1',
    },
  }).to(cube.meshGroup.position, { y: '+=1' }, '<')
    .to(cube.meshGroup.scale, { x: 0.7, y: 0.7, z: 0.7 }, '<')
    .to(cube.meshGroup.position, { x: '-=4.25'}, '<.2')
    .call(() => {
      scene.attach(comma);
      cube.meshGroup.remove(comma);
      cube.meshGroup.updateWorldMatrix(true, true);
    });
}
