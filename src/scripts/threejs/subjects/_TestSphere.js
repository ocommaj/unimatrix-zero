import { SphereGeometry, MeshLambertMaterial, Mesh } from 'three';

export default function addSphere(scene) {
  const geometry = new SphereGeometry(1, 32, 32);
  const material = new MeshLambertMaterial({ color: 0x00CC00 });
  const mesh = new Mesh(geometry, material);
  mesh.position.set(1, 1, 1);

}
