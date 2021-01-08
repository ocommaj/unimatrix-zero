import { BoxGeometry, MeshLambertMaterial, Mesh, PointLight } from 'three';
import meshModifiers from '../modifiers';

export default Cube;

function Cube({ size, position = null, rotation = null, scale = null }) {
  const material_one = new MeshLambertMaterial({
    color: 0xda1e28,
    reflectivity: 1,
  });
  const material_two = new MeshLambertMaterial({
    color: 0xa6c8ff,
    reflectivity: 1,
    transparent: true,
    opacity: 0.5,
  });

  const cubeLight = new PointLight(0xfff, 0, 8, 2);
  const materials = [
    material_two,
    material_two,
    material_two,
    material_two,
    material_one,
    material_two,
  ];
  const geometry = new BoxGeometry(size, size, size);
  const cube = new Mesh(geometry, materials);
  cube.add(cubeLight);
  cubeLight.visible = false;
  position && meshModifiers.position(cube, position);
  rotation && meshModifiers.rotate(cube, rotation, false);
  scale && meshModifiers.scale(cube, scale);
  cube.userData.isClickable = true;

  return cube;
}
