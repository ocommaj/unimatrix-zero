import { TextureLoader, MeshBasicMaterial, SphereGeometry, Mesh } from 'three';
import imgTexture from '../../../assets/img/surfaceSMProfile.jpg';
import { bubbleToTop } from '../animate';

export default function imageBubble(scene) {
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
  mesh.position.set(-4, -2, 4);
  mesh.rotateX(0.1);
  mesh.rotateY(-0.5);
  mesh.rotateZ(-0.6);
  mesh.scale.set(0, 0, 0);
  mesh.castShadow = true;
  mesh.visible = false;
  scene.add(mesh);

  this.animateReveal = (key) => bubbleToTop(mesh).play();
}
