import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default function showIntroBox(boxGroup, comma, target) {
  const boxes = { ...meshAnimationProperties(boxGroup.children) };
  return gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'bounce',
      stagger: {
        each: 0.1,
        from: 'random',
      },
    },
  })
    .to(boxes.positions, { ...target.positions })
    .to(comma.position, { ...target.commaPos }, '<')
    .to(boxes.scales, { ...target.scales}, '<')
    .to(boxGroup.rotation, { y: -0.2 }, '<')
    .to(comma.rotation, { y: -0.4 }, '<');
  // .to(boxes.rotations, { x: .1})

}
