import { TextureLoader, MeshBasicMaterial, SphereGeometry, Mesh } from 'three';
import imgTexture from '../../../../assets/img/surfaceSMProfile.jpg';
import { bubbleToTop } from '../../animate';
import animationTargets from './_animationTargets';

export default function imageBubble(scene) {
  const { device } = scene.userData;
  const { start, toTop } = animationTargets[device.type];
  console.dir(toTop)
  const loader = new TextureLoader();
  const texture = loader.load(imgTexture);
  texture.rotation = 0.15;
  const material = new MeshBasicMaterial({
    color: 0xa6c8ff,
    opacity: 1,
    transparent: true,
    map: texture,
  });
  const geometry = new SphereGeometry(1.5, 32, 32);
  const mesh = new Mesh(geometry, material);

  mesh.position.set(start.position.x, start.position.y, start.position.z);
  mesh.rotation.set(start.rotation.x, start.rotation.y, start.rotation.z);
  mesh.scale.set(start.scale.x, start.scale.y, start.scale.z);
  mesh.visible = start.visible;
  scene.add(mesh);

  this.animateReveal = (key) => bubbleToTop(mesh, start, toTop).play();
}
