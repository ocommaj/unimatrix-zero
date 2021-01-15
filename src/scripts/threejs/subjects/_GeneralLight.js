import { PointLight } from 'three';

export default function GeneralLight(scene) {
  // const light = new PointLight(0x142424, 1, 30, 2);
  const light = new PointLight(0xfff, 1, 30, 2);
  light.position.set(-2, 2.5, 12);
  scene.add(light);

  this.update = ({ elapsedTime }) => {
    light.intensity = (Math.sin(elapsedTime) + 1.5) / 1.5 + 0.5;
  };
}
