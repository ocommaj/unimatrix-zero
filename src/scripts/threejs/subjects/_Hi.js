import { hiTimelines } from '../animate';
import { makeUpperH, makeLowerI, notInLetters } from './_Letters';

export default function spellHi(inFace) {
  const upperH = makeUpperH(inFace);
  const lowerI = makeLowerI(inFace);
  const notLetters = notInLetters(inFace, [ upperH, lowerI ]);
  const { loopHi: loop } = hiTimelines(upperH, lowerI, notLetters);

  return {
    animate: { loop },
    iDot: lowerI.dot,
  };

}
