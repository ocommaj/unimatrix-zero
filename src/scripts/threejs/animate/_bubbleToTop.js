import { gsap } from 'gsap';

export default function bubbleToTop(mesh) {
  const timelineDefaults = {
    paused: true,
    onStart: () => { mesh.visible = true; },
    onComplete: () => {
      mesh.visible = false;
      mesh.material.opacity = 1;
      mesh.scale.set(0, 0, 0);
      mesh.position.set(
        mesh.position.x,
        mesh.position.y - 10,
        mesh.position.z - 2);
    },
    defaults: {
      duration: 1,
      ease: 'power1.in',
    },
  };

  return gsap.timeline(timelineDefaults)
    .to(mesh.scale, { x: 1, y: 1, z: 1 })
    .to(mesh.position, { y: '+=10', z: '+=2', duration: 4 }, '<')
    .to(mesh.material, { opacity: 0.4 }, '-=2');
}
