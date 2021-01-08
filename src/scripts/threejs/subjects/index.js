import Comma from './_Comma';
import Cube from './_Cube';
import CubeCubes from './_CubeCubes';
import Floor from './_Floor';
import GeneralLight from './_GeneralLight';
import IntroBox from './_IntroBox';
import MessageCube from './_MessageCube';
import TestSphere from './_TestSphere';
import SpellHi from './_Hi';
import * as letters from './_Letters';

export default {
  letters,
  comma: (config) => new Comma(config),
  cube: (config) => Cube(config),
  cubeCubes: (config) => CubeCubes(config),
  introBox: (config) => new IntroBox(config),
  floor: (scene) => new Floor(scene),
  spellHi: (face) => SpellHi(face),
  generalLight: (scene) => new GeneralLight(scene),
  messageCube: (config) => new MessageCube(config),
  testSphere: (scene) => new TestSphere(scene),
};
