import Comma from './_Comma';
import Cube from './_Cube';
import HexLayer from './_HexLayer';
import HollowEarth from './HollowEarth';
import GeneralLight from './_GeneralLight';
import ContentBox from './ContentBox';
import MessageCube from './_MessageCube';
import ImageBubble from './ImageBubble';
import * as letters from './_Letters';

export default {
  letters,
  comma: (config) => new Comma(config),
  cube: (config) => new Cube(config),
  generalLight: (scene) => new GeneralLight(scene),
  hexLayer: (scene, camera) => new HexLayer(scene, camera),
  hollowEarth: (config) => new HollowEarth(config),
  imageBubble: (scene) => new ImageBubble(scene),
  introBox: (config) => new ContentBox(config),
  messageCube: (config) => new MessageCube(config),
};
