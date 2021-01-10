import { gsap } from 'gsap';
import { meshAnimationProperties } from './index';

const tlDefaults = {
  paused: true,
  delay: 0.2,
  repeatDelay: 1.4,
  defaults: {
    duration: 1,
    ease: 'bounce',
    stagger: {
      each: 0.1,
      from: 'random',
    },
  },
};

export default function hiTimelines(upperH, lowerI, notLetters) {
  const h = {
    ...meshAnimationProperties(upperH.boxes),
    beam: { ...meshAnimationProperties(upperH.beamBoxes) },
  };
  const i = { ...meshAnimationProperties(lowerI.boxes), dot: lowerI.dot };
  const blanks = { ...meshAnimationProperties(notLetters.boxes) };

  h.startPos = h.positions[0];
  i.startPos = i.positions[0];
  blanks.startPos = blanks.positions[0];

  const toggleHBeam = beamToggler();

  return {
    loopHi,
    showHi,
    hideHi,
    showComma,
  };

  function loopHi(loopCallback) {
    return gsap.timeline({ ...tlDefaults })
      .add(showHi())
      .add(hideHi())
      .call(() => loopCallback());
  }

  function showHi() {
    return gsap.timeline({ ...tlDefaults, paused: false })
      .to(h.positions, { z: '+=.25' })
      .to(blanks.positions, { z: '-=.5'}, '<')
      .to(blanks.scales, { x: 0.75, y: 0.75 }, '<')
      .to(h.scales, { y: 1.5 }, '<')
      .add(toggleHBeam.expand(), '<')
      .to(i.positions, { z: '+=.25' }, '<')
      .to(i.scales, { y: 1.5 }, '<')
      .to(i.dot.position, { y: '-=.25' }, '<')
      .add(dotI(), '-=.3');
  }

  function hideHi() {
    const tl = gsap.timeline({ ...tlDefaults, paused: false })
      .to(h.positions, { z: h.startPos.z }, '<3')
      .to(blanks.positions, { z: blanks.startPos.z }, '<')
      .to(blanks.scales, { x: 1, y: 1 }, '<')
      .to(h.scales, { y: 1 }, '<')
      .add(toggleHBeam.reset(), '<')
      .to(i.positions, { z: i.startPos.z }, '<')
      .to(i.scales, { y: 1 }, '<')
      .to(i.dot.position, { y: '+=.25' }, '<');
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
      .to(i.dot.position, { y: '-=.1' }, '-=.4')
      .to(i.dot.position, { y: '+=.1' });
  }

  function beamToggler() {
    const firstPos = h.beam.positions[0];
    const lastPos = h.beam.positions[h.beam.positions.length - 1];
    const firstStartX = firstPos.x;
    const lastStartX = lastPos.x;
    const dX = (h.beam.positions[1].x - h.beam.positions[0].x) / 8;
    return {
      expand() {
        return gsap.timeline({ delay: 0 })
          .to(h.beam.scales, { x: 2 }, '<')
          .to(firstPos, { x: `-=${dX}`}, '<')
          .to(lastPos, { x: `+=${dX}`}, '<');
      },
      reset() {
        return gsap.timeline({ delay: 0 })
          .to(h.beam.scales, { x: 1 }, '<')
          .to(firstPos, { x: firstStartX }, '<')
          .to(lastPos, { x: lastStartX }, '<');
      },
    };
  }

  function showComma(commaMesh) {
    return gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: 'elastic',
      },
    }).to(commaMesh.scale, { x: 0.5, y: 0.5, z: 0.5 })
      .to(commaMesh.rotation, { y: 6.28 }, '<');
  }

}
