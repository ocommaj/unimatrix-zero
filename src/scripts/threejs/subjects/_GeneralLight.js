import { PointLight } from 'three';

export default function GeneralLight(scene) {
  const light = new PointLight(0xfff, 1, 100, 2);
  light.position.set(-2, 2.5, 16);
  scene.add(light);

  this.update = (time) => {
    light.intensity = Math.max(0.75, (Math.sin(time) + 1.5) / 1.5 + 0.5);
  };
}
