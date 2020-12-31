import { gsap } from 'gsap';

export default function cameraZoomOut(camera, targetPos) {
  const tl = gsap.timeline({ ease: 'power2', duration: '1.2' })
    .to(camera.position, { ...targetPos });
  return tl;
}
