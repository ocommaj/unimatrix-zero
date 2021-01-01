import { gsap } from 'gsap';

export default function cameraZoomOut(camera, targetPos, callback) {
  const tl = gsap.timeline({
    ease: 'power2',
    duration: '1.2',
    onComplete: () => callback(),
  })
    .to(camera.position, { y: targetPos.y, z: targetPos.z })
    .to(camera.position, { x: targetPos.x }, '<.2');
    // .call( () => console.dir(camera) )
  return tl;
}
