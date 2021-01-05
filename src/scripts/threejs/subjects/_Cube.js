import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import meshModifiers from '../modifiers';

export default Cube;

function Cube({ size, position = null, rotation = null, scale = null }) {
  const geometry = new BoxGeometry(size, size, size);
  const material = new MeshLambertMaterial({
    color: 0x0f62fe,
    reflectivity: 0.5,
  });
  const cube = new Mesh(geometry, material);
  position && meshModifiers.position(cube, position);
  rotation && meshModifiers.rotate(cube, rotation, false);
  scale && meshModifiers.scale(cube, scale);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.userData.isClickable = true;

  return cube;
}
