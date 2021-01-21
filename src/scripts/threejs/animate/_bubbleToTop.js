import { gsap } from 'gsap';

export default function bubbleToTop(mesh, startValue, targetValue, onComplete) {
  const timelineDefaults = {
    paused: true,
    onStart: () => { mesh.visible = targetValue.visible; },
    onComplete: () => onComplete(),
    defaults: {
      duration: 1,
      ease: 'power1.in',
    },
  };

  return gsap.timeline(timelineDefaults)
    .to(mesh.scale, { ...targetValue.scale })
    .to(mesh.position, { ...targetValue.position }, '<')
    .to(mesh.material, { ...targetValue.material }, '-=2')
    .set(mesh, { visible: startValue.visible })
    .set(mesh.material, { ...startValue.material })
    .set(mesh.scale, { ...startValue.scale })
    .set(mesh.position, { ...startValue.position })
}
