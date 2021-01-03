import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default function showIntroBox(boxGroup, comma, target, callback) {
  const sideLength = Math.sqrt(boxGroup.children.length);
  let boxes = [ ...boxGroup.children ];

  const filtered = boxes.filter((_, i) => {
    return (
      i <= sideLength
      || i >= boxes.length - sideLength
      || !(i % sideLength)
      || !((i + 1) % sideLength)
    );
  });

  let perimeter = filtered.map(box => {
    return boxes.splice(boxes.indexOf(box), 1).pop();
  });

  let horizontal = perimeter.slice(0, sideLength);
  horizontal.push(...perimeter.slice(perimeter.length - sideLength));
  let bottom = horizontal.slice(0, sideLength);
  let top = horizontal.slice(horizontal.length - sideLength);

  let vertical = perimeter.filter(box => !horizontal.includes(box));
  let left = vertical.filter((_, i) => !(i % 2));
  let right = vertical.filter((_, i) => (i % 2));

  boxes = { ...meshAnimationProperties(boxes) };
  perimeter = { ...meshAnimationProperties(perimeter) };
  horizontal = { ...meshAnimationProperties(horizontal) };
  top = { ...meshAnimationProperties(top) };
  bottom = { ...meshAnimationProperties(bottom) };
  vertical = { ...meshAnimationProperties(vertical) };
  left = { ...meshAnimationProperties(left) };
  right = { ...meshAnimationProperties(right) };

  return gsap.timeline({
    onComplete: () => callback(),
    defaults: {
      duration: 1,
      ease: 'power2',
      stagger: {
        each: 0.05,
        from: 'random',
      },
    },
  })
    .to(boxes.positions, { ...target.positions })
    .to(boxes.scales, { ...target.scales}, '<')
    .to(perimeter.scales, { ...target.perimeter.interScales}, '<')
    .to(perimeter.positions, { ...target.positions }, '<')
    .to(comma.position, { ...target.commaPos }, '<')
    .to(comma.rotation, { y: -0.4 }, '<')
    .to(boxGroup.rotation, { y: -0.2 }, '<')
    .to(vertical.scales, { ...target.vertical.scales }, '-=.2')
    .to(horizontal.scales, { ...target.horizontal.scales }, '<')
    .to(perimeter.positions, { z: '+=.25' }, '<')
    .to(top.positions, { y: '+=.25' }, '<')
    .to(bottom.positions, { y: '-=.25' }, '<')
    .to(left.positions, { ...target.vertical.left }, '<')
    .to(right.positions, { ...target.vertical.right }, '<');
}
