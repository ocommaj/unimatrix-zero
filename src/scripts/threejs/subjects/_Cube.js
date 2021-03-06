import {
  BoxBufferGeometry, Color, MeshLambertMaterial, Mesh, PointLight,
} from 'three';
import { meshModifiers } from '../modifiers';

export default Cube;
function Cube({ size, position = null, rotation = null, scale = null }) {
  const BLUE_40 = new Color(0x78a9ff);
  const BLUE_60 = new Color(0x0f62fe);
  const BLUE_80 = new Color(0x002d9c);
  const material_one = new MeshLambertMaterial({
    color: 0x353535,
    opacity: 0.9,
  });
  const material_two = new MeshLambertMaterial({
    color: BLUE_60,
    transparent: true,
    opacity: 0.5,
  });

  const cubeLight = new PointLight(BLUE_80, 0, 8, 2);
  const materials = [
    material_two,
    material_two,
    material_two,
    material_two,
    material_one,
    material_two,
  ];
  const geometry = new BoxBufferGeometry(size, size, size);
  const cube = new Mesh(geometry, materials);
  cube.add(cubeLight);
  cubeLight.visible = false;
  position && meshModifiers.position(cube, position);
  rotation && meshModifiers.rotate(cube, rotation, false);
  scale && meshModifiers.scale(cube, scale);
  cube.userData.isClickable = true;

  return cube;


}
