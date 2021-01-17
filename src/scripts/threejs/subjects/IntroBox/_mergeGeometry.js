import { Mesh, Vector3 } from 'three';
import cylinderGeometry from './_cylinderGeometry';

export default function mergeGeometry(introBox) {
  return new Promise(resolve => {
    const mesh = new Mesh();
    const tempPosVector = new Vector3();
    const geometry = cylinderGeometry();

    const midpoint = introBox.userData.midpoints.inner;
    const material = midpoint.material[4].clone();
    midpoint.getWorldPosition(tempPosVector);
    mesh.copy(midpoint);
    introBox.userData.midpoints.inner = null;
    introBox.remove(midpoint);
    mesh.clear();
    mesh.scale.set(4.5, 6, 0.1);
    mesh.position.set(
      tempPosVector.x + 0.25,
      tempPosVector.y,
      tempPosVector.z);
    const cylinderMesh = new Mesh(geometry, material);
    cylinderMesh.name = 'introBoxDrum';
    cylinderMesh.position.set(
      tempPosVector.x + 0.6,
      tempPosVector.y,
      tempPosVector.z - 4.7);

    mesh.name = 'introBoxBG';
    mesh.updateMatrix();
    mesh.material.transparent = true;
    mesh.material.opacity = 0;
    mesh.visible = false;
    cylinderMesh.material.transparent = true;
    cylinderMesh.material.opacity = 0.6;
    introBox.userData.midpoints.inner = mesh;

    introBox.clear();
    introBox.add(cylinderMesh);
    introBox.add(...Object.values(introBox.userData.midpoints));
    resolve();
  });
}