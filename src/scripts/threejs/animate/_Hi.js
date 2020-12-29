import { gsap } from 'gsap';

const tlDefaults = {
  paused: true,
  delay: 0.7,
  repeatDelay: 1.4,
  defaults: {
    duration: 1,
    ease: 'bounce.out',
    stagger: {
      each: 0.1,
      from: 'random',
    },
  },
};

export default function hiTimelines(upperH, lowerI, notLetters) {
  upperH.start = upperH.positions[0];
  notLetters.start = notLetters.positions[0];
  lowerI.start = lowerI.positions[0];
  const toggleBeam = beamToggler();

  return {
    loopHi,
    showHi,
    hideHi,
    showComma,
  };

  function loopHi(loopCallback, commaMesh = null) {
    return gsap.timeline({ ...tlDefaults })
      .add(showHi())
      .add(hideHi(commaMesh))
      .call(() => loopCallback());
  }

  function showHi() {
    return gsap.timeline({ ...tlDefaults, paused: false })
      .to(upperH.positions, { z: '+=.25' })
      .to(notLetters.positions, { z: '-=.5'}, '<')
      .to(notLetters.scales, { x: 0.75, y: 0.75 }, '<')
      .to(upperH.scales, { y: 1.5 }, '<')
      .add(toggleBeam.expand(), '<')
      .to(lowerI.positions, { z: '+=.25' }, '<')
      .to(lowerI.scales, { y: 1.5 }, '<')
      .to(lowerI.dot.position, { y: '-=.25' }, '<')
      .add(dotI(), '-=.3');
  }

  function hideHi(commaMesh) {
    const tl = gsap.timeline({ ...tlDefaults, paused: false })
      .to(upperH.positions, { z: upperH.start.z }, '<3')
      .to(notLetters.positions, { z: notLetters.start.z }, '<')
      .to(notLetters.scales, { x: 1, y: 1 }, '<')
      .to(upperH.scales, { y: 1 }, '<')
      .add(toggleBeam.reset(), '<')
      .to(lowerI.positions, { z: lowerI.start.z }, '<')
      .to(lowerI.scales, { y: 1 }, '<')
      .to(lowerI.dot.position, { y: '+=.25' }, '<');
    if (commaMesh) tl.add(hideComma(commaMesh), '<');
    return tl;
  }

  function dotI() {
    return gsap.timeline({
      // duration: 1.4,
      repeat: 2,
      repeatDelay: 0.2,
      yoyo: true,
      defaults: {
        duration: 0.5,
      },
    })
      .to(lowerI.dot.position, { y: '-=.1' }, '-=.4')
      .to(lowerI.dot.position, { y: '+=.1' });
  }

  function beamToggler() {
    const first = upperH.beam.boxes[0];
    const last = upperH.beam.boxes[upperH.beam.boxes.length - 1];
    const dX = (upperH.beam.positions[1].x - upperH.beam.positions[0].x) / 8;
    return {
      expand() {
        return gsap.timeline({ delay: 0 })
          .to(upperH.beam.scales, { x: 2 }, '<')
          .to(first.position, { x: `-=${dX}`}, '<')
          .to(last.position, { x: `+=${dX}`}, '<');
      },
      reset() {
        return gsap.timeline({ delay: 0 })
          .to(upperH.beam.scales, { x: 1 }, '<')
          .to(first.position, { x: `+=${dX}`}, '<')
          .to(last.position, { x: `-=${dX}`}, '<');
      },
    };
  }

  function showComma(commaMesh) {
    return gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: 'elastic',
      },
    }).to(commaMesh.scale, { x: 0.5, y: 0.5, z: 0.5 });
  }

  function hideComma(commaMesh) {
    return gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: 'expo',
      },
    }).to(commaMesh.scale, { x: 0, y: 0, z: 0 });
  }
}
