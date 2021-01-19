import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

export default showIntroBox;

function showIntroBox(introBoxGroup, mainCube, comma, target, callback) {
  const { userData: { sides, midpoints } } = introBoxGroup;
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

  const tl = gsap.timeline({
    paused: true,
    //onComplete: () => target.deviceType ==='desktop' ? callback() : null,
    onComplete: () => callback(),
    defaults: {
      duration: 1,
      ease: 'power4',
      stagger: {
        each: 0.1,
        from: 'random',
      },
    },
  });

  tl.to([inner.positions, midInner.position], { ...target.inner.positions })
    .to(top.positions, { ...target.horizontal.topPosition }, '<')
    .to(midTop.position, { ...target.horizontal.topPosition }, '<')
    .to(bottom.positions, { ...target.horizontal.bottomPosition }, '<')
    .to(midBottom.position, { ...target.horizontal.bottomPosition }, '<')
    .to(left.positions, { ...target.vertical.leftPosition }, '<')
    .to(midLeft.position, { ...target.vertical.leftPosition }, '<')
    .to(right.positions, { ...target.vertical.rightPosition }, '<')
    .to(midRight.position, { ...target.vertical.rightPosition }, '<')
    .to(comma.position, { ...target.comma.positions[0] }, '<')
    .to(comma.rotation, { ...target.comma.rotation }, '<')
    .to(introBoxGroup.rotation, { ...target.introBoxGroup.rotation }, '<')
    .to(mainCube.rotation, { ...target.mainCube.rotation }, '<')
    .to(inner.scales, { ...target.inner.scales }, '<.4')
    .to(midInner.scale, { ...target.inner.scales }, '<.2')
    .to(left.scales, { ...target.zeroScale }, '<')
    .to(midLeft.scale, { ...target.vertical.scaleMid }, '<')
    .to(right.scales, { ...target.zeroScale }, '<')
    .to(midRight.scale, { ...target.vertical.scaleMid }, '<')
    .to(top.scales, { ...target.zeroScale }, '<')
    .to(midTop.scale, { ...target.horizontal.scaleMid }, '<')
    .to(bottom.scales, { ...target.zeroScale }, '<')
    .to(midBottom.scale, { ...target.horizontal.scaleMid }, '<')
    .to(comma.material, { emissiveIntensity: 0.5 }, '-=.2')
    .to(comma.scale, { ...target.comma.scale }, '<')
    .to(comma.position, { ...target.comma.positions[1] }, '<')
    .to([inner.materials, midInner.material], {
      ...target.inner.materials
    }, '<')
    .call(() => {
      if (target.device.type === 'mobile') mainCube.visible = false;
    });

  return tl;
}
