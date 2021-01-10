import Comma from './_Comma';
import Cube from './_Cube';
import CubeCubes from './_CubeCubes';
import Floor from './_Floor';
import GeneralLight from './_GeneralLight';
import IntroBox from './_IntroBox';
import MessageCube from './_MessageCube';
import ImageBubble from './_imageBubble';
import * as letters from './_Letters';

export default {
  letters,
  comma: (config) => new Comma(config),
  cube: (config) => Cube(config),
  cubeCubes: (config) => CubeCubes(config),
  generalLight: (scene) => new GeneralLight(scene),
  imageBubble: (scene) => new ImageBubble(scene),
  introBox: (config) => new IntroBox(config),
  floor: (scene, camera) => new Floor(scene, camera),
  messageCube: (config) => new MessageCube(config),
};
