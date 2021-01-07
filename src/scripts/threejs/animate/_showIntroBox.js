import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default showIntroBox;

function showIntroBox(boxGroup, mainCube, comma, target, callback) {
  const sideLength = Math.sqrt(boxGroup.children.length);

  let perimeter = boxGroup.userData.perimeter;
  let innerBoxes = boxGroup.userData.innerBoxes;

  let horizontal = perimeter.slice(0, sideLength);
  horizontal.push(...perimeter.slice(perimeter.length - sideLength));
  let bottom = horizontal.slice(0, sideLength);
  let top = horizontal.slice(horizontal.length - sideLength);
  const midTop = top.splice(Math.floor(top.length / 2), 1)[0];
  const midBottom = bottom.splice(Math.floor(bottom.length / 2), 1)[0];

  let vertical = perimeter.filter(box => !horizontal.includes(box));
  let left = vertical.filter((_, i) => !(i % 2));
  let right = vertical.filter((_, i) => (i % 2));
  const midLeft = left.splice(Math.floor(left.length / 2), 1)[0];
  const midRight = right.splice(Math.floor(left.length / 2), 1)[0];

  innerBoxes = { ...meshAnimationProperties(innerBoxes) };
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
      ease: 'power4',
      stagger: {
        each: 0.1,
        from: 'random',
      },
    },
  })
    .to(innerBoxes.positions, { ...target.positions })
    .to(top.positions, { ...target.horizontal.topPos }, '<')
    .to(midTop.position, { ...target.horizontal.topPos }, '<')
    .to(bottom.positions, { ...target.horizontal.bottomPos }, '<')
    .to(midBottom.position, { ...target.horizontal.bottomPos }, '<')
    .to(left.positions, { ...target.vertical.leftPos }, '<')
    .to(midLeft.position, { ...target.vertical.leftPos }, '<')
    .to(right.positions, { ...target.vertical.rightPos}, '<')
    .to(midRight.position, { ...target.vertical.rightPos }, '<')
    .to(comma.position, { ...target.comma.pos }, '<')
    .to(comma.rotation, { y: -0.1 }, '<')
    .to(boxGroup.rotation, { y: -0.15 }, '<')
    .to(mainCube.rotation, { y: 0.2 }, '<')
    .to(innerBoxes.scales, { ...target.scales}, '<.4')
    // .to(vertical.scales, { ...target.vertical.scales }, '<')
    .to(left.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midLeft.scale, { x: 0.5, y: 5.85 }, '<')
    .to(right.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midRight.scale, { x: 0.5, y: 5.85 }, '<')
    // .to(horizontal.scales, { ...target.horizontal.scales }, '<')
    .to(top.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midTop.scale, { ...target.horizontal.scales }, '<')
    .to(bottom.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midBottom.scale, { ...target.horizontal.scales }, '<')
    .to(comma.material, { emissiveIntensity: 0.3 }, '-=.2')
    .to(comma.scale, { z: 0.5 }, '<')
    .to(comma.position, { z: '-=.1' }, '<')

    .to(innerBoxes.materials, {
      opacity: 0.5,
      emissive: 0x525252,
      emissiveIntensity: 0.5,
      stagger: 0,
    }, '<');

}
