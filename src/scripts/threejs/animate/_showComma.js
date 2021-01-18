import { gsap } from 'gsap';

export default function showComma({ comma, deviceType, camera }) {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'elastic',
    },
  });

  if (deviceType === 'mobile') {
    tl.to(camera.position, { z: '+=5', ease: 'power1' });
  }

  tl.to(comma.scale, { x: 0.5, y: 0.5, z: 0.5 })
    .to(comma.rotation, { y: 6.28 }, '<');

  if (deviceType === 'mobile') {
    tl.to(camera.position, { z: '-=5', ease: 'power4' }, '>.4');
  }


  return tl;
}
