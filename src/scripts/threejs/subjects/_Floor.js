import * as THREE from 'three';

export default function Floor(scene) {
  const mat_one = new THREE.MeshLambertMaterial({
    color: 0xFFF,
    reflectivity: 0.1,
  });
  const mat_two = mat_one.clone();
  mat_two.opacity = 0.4;
  mat_two.transparent = true;

  const mat_three = mat_two.clone();

  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 6, 1);
  const wireframe = new THREE.WireframeGeometry(geometry);
  const meshFloor = new THREE.Mesh(geometry, [mat_one, mat_three, mat_two]);
  const line = new THREE.LineSegments(
    wireframe,
    new THREE.LineBasicMaterial({
      color: 0xffaa00, linewidth: 0.1,
    }));

  line.material.opacity = 0.5;
  line.material.transparent = true;

  meshFloor.rotateX(-1.57);
  line.rotateX(-1.57);

  const hexGroup = new THREE.Group();
  hexGroup.attach(meshFloor);
  // hexGroup.attach(line)

  const bgMeshMesh = new THREE.Group();
  const row = (yInt = 0) => {
    const isOdd = yInt % 2 !== 0;
    const row = new THREE.Group();
    for (let i = 0; i < 40; i++) {
      const x = i * 1.01;
      const clone = hexGroup.clone();
      clone.position.set(x, clone.position.y, clone.position.z);
      row.add(clone);
    }
    const x = isOdd ? -(19.5 * 1.005) : -(20 * 1.005);
    row.position.set(x, yInt * 0.75, 0);
    if (yInt) {
      const cloneRow = row.clone();
      cloneRow.position.set(0, -yInt * 0.75 - row.position.y, row.position.z);
      row.add(cloneRow);
    }
    return row;
  };

  for (let i = 0; i < 12; i++) {
    bgMeshMesh.add(row(i));
  }

  scene.add(bgMeshMesh);

}
