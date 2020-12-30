import { PointLight } from 'three';

export default function GeneralLight(scene) {
  const light = new PointLight(0x0f62fe, 1, 50);
  // const light = new PointLight(0x00bb00, 1, 50);
  light.position.set(-3, 2.5, 4.75);
  scene.add(light);

  this.update = (time) => {
    light.intensity = (Math.sin(time) + 1.5) / 1.5 + 0.5;
    // light.color.setHSL( Math.sin(time), 0.5, 0.5 );

  };
}
