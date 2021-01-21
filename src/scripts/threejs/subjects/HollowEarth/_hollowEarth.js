import { SphereBufferGeometry, MeshLambertMaterial, Mesh } from 'three';

export default function HollowEarth({ scene, camera }) {
  const sphereGeo = new SphereBufferGeometry(40, 32, 32, 0, 2.3, 1.14, 1.14)
  const material = new MeshLambertMaterial({ color: 0x0f62fe });
  const sphereMesh = new Mesh(sphereGeo, material);

  material.opacity = .2;
  sphereMesh.position.set(0, 0, -40)
  scene.add(sphereMesh)
}
