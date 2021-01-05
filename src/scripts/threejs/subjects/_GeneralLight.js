import { PointLight } from 'three';


export default function GeneralLight(scene) {
  const light = new PointLight(0x0043ce, 0.5, 50, 2);
  light.position.set(-2, 2.5, 12);
  scene.add(light);

  this.update = (time) => {
    light.intensity = (Math.sin(time) + 1.5) / 1.5 + 0.5;
  };
}
