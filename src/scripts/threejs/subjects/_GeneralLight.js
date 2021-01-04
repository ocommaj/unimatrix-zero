import { PointLight, RectAreaLight, AmbientLight, HemisphereLight } from 'three';


export default function GeneralLight(scene) {
  const light = new RectAreaLight(0x0f62fe, 0.5, 10, 10);
  // const light = new AmbientLight(0x0f62fe, .5);
  // const light = new AmbientLight(0x0f62fe, .5)
  // const light = new PointLight(0x00bb00, 1, 50);
  light.position.set(-3, 2.5, 12);
  scene.add(light);

  this.update = (time) => {
    light.intensity = (Math.sin(time) + 1.5) / 1.5 + 0.5;
    // light.color.setHSL( Math.sin(time), 0.5, 0.5 );

  };
}
