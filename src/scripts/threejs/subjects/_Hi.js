import { hiTimelines } from '../animate';
import { makeUpperH, makeLowerI, notInLetters } from './_Letters';

export default function spellHi(inFace) {
  const upperH = makeUpperH(inFace);
  const lowerI = makeLowerI(inFace);
  const notLetters = notInLetters(inFace, [ upperH, lowerI ]);
  const animations = hiTimelines(upperH, lowerI, notLetters);

  const { showComma, hideHi, loopHi: loopAnimation } = animations;

  return {
    loopAnimation,
    showComma,
    hideHi,
    iDot: lowerI.dot,
  };

}
