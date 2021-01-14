import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default showIntroBox;

function showIntroBox(boxGroup, mainCube, comma, target, callback) {
  const { userData: { sides, midpoints } } = boxGroup;

  const {
    inner: midInner,
    top: midTop,
    bottom: midBottom,
    left: midLeft,
    right: midRight,
  } = midpoints;

  const boxes = () => Object.keys(sides).reduce((boxes, key) => {
    boxes[key] = { ...meshAnimationProperties(sides[key]) };
    return boxes;
  }, {});

  const { inner, top, bottom, left, right } = boxes();

  return gsap.timeline({
    paused: true,
    onComplete: () => callback(),
    defaults: {
      duration: 1,
      ease: 'power4',
      stagger: {
        each: 0.1,
        from: 'random',
      },
    },
  }).to(inner.positions, { ...target.positions })
    .to(midInner.position, { ...target.positions }, '<')
    .to(top.positions, { ...target.horizontal.topPos }, '<')
    .to(midTop.position, { ...target.horizontal.topPos }, '<')
    .to(bottom.positions, { ...target.horizontal.bottomPos }, '<')
    .to(midBottom.position, { ...target.horizontal.bottomPos }, '<')
    .to(left.positions, { ...target.vertical.leftPos }, '<')
    .to(midLeft.position, { ...target.vertical.leftPos }, '<')
    .to(right.positions, { ...target.vertical.rightPos }, '<')
    .to(midRight.position, { ...target.vertical.rightPos }, '<')
    .to(comma.position, { ...target.comma.pos }, '<')
    .to(comma.rotation, { y: -0.1 }, '<')
    .to(boxGroup.rotation, { y: -0.15 }, '<')
    .to(mainCube.rotation, { y: 0.2 }, '<')
    .to(inner.scales, { ...target.scales }, '<.4')
    .to(midInner.scale, { ...target.scales }, '<.4')
    .to(left.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midLeft.scale, { x: 0.5, y: 5.85 }, '<')
    .to(right.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midRight.scale, { x: 0.5, y: 5.85 }, '<')
    .to(top.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midTop.scale, { ...target.horizontal.scales }, '<')
    .to(bottom.scales, { x: 0, y: 0, z: 0 }, '<')
    .to(midBottom.scale, { ...target.horizontal.scales }, '<')
    // .to(comma.children[0].material, { emissiveIntensity: 0.5 }, '-=.2')
    .to(comma.material, { emissiveIntensity: 0.5 }, '-=.2')
    // .to(comma.scale, { z: 1.5 }, '<')
    .to(comma.scale, { z: 0.5 }, '<')
    .to(comma.rotation, { y: -0.15 }, '<')
    .to(comma.position, { z: '-=.1' }, '<')
    .to([inner.materials, midInner.material], {
      opacity: 0.5,
      emissive: 0x525252,
      emissiveIntensity: 0.5,
      stagger: 0,
    }, '<');
}
