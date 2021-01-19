import {
  Color, BackSide, SphereBufferGeometry, MeshLambertMaterial, Mesh
} from 'three';

export default function HollowEarth({ scene, camera }) {
  const sphereGeo = new SphereBufferGeometry(40, 32, 32, 0, 2.3, 1.14, 1.14)
  const material = new MeshLambertMaterial

  const BLUE_80 = new Color(0x002d9c);
  const material_one = new MeshLambertMaterial({
    color: BLUE_80,
    opacity: 0.2,
    transparent: true,
    side: BackSide,
  });

  const sphereMesh = new Mesh(sphereGeo, material);
  sphereMesh.position.set(0, 0, -40)
  scene.add(sphereMesh)
}
