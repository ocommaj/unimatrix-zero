import * as THREE from 'three';
import {
  BufferGeometryUtils,
} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LifeGame } from '../modifiers';

export default function HexLayer(scene, camera) {
  const camPosVector = new THREE.Vector3();
  const mat_one = new THREE.MeshLambertMaterial({
    color: 0xFFF,
    transparent: true,
    opacity: 0.2,
  });
  const mat_two = new THREE.MeshLambertMaterial({
    color: 0xFFF,
    transparent: true,
    opacity: 0.5,
  });

  const mat_three = mat_one.clone();
  mat_three.opacity = 0.3;
  const mat_four = mat_one.clone();
  mat_four.emissive = 0xFFF;
  mat_four.transparent = false;
  mat_four.emissiveIntensity = 0.25;

  const hexGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 0.25, 6, 1);
  // const wireframe = new THREE.WireframeGeometry(hexGeometry);
  // const meshFloor = new THREE.Mesh(hexGeometry, [mat_one, mat_two, mat_two]);
  /* const line = new THREE.LineSegments(
    wireframe,
    new THREE.LineBasicMaterial({
      color: 0xffaa00, linewidth: 0.1,
    }));

  line.material.opacity = 0.3;
  line.material.transparent = true;

  meshFloor.rotateX(-1.57);
  line.rotateX(-1.57);*/

  camera.getWorldPosition(camPosVector);

  // const hexGroup = new THREE.Group();
  // hexGroup.attach(meshFloor);
  // hexGroup.attach(line);

  const COUNT = 40;
  const ROW_COUNT = 24;
  const X_OFFSET = 1.025;
  const Y_OFFSET = 0.75;
  const hexBuffer = bigBufferGeometry();
  hexBuffer.groups.forEach((group, i) => { group.materialIndex = i % 3; });
  const mesh = new THREE.Mesh(
    hexBuffer,
    [mat_one, mat_two, mat_three, mat_four]);
  mesh.position.set(0, -Y_OFFSET * (ROW_COUNT / 2), 0);
  scene.add(mesh);

  const life = new LifeGame(hexBuffer.groups, ROW_COUNT, COUNT);
  this.playLife = () => life.initialSpawn();
  this.update = ({ nowSecond }) => {
    if (nowSecond && !(nowSecond % 3) && life.lastUpdate !== nowSecond) {
      life.lastUpdate = nowSecond;
      life.evolve();
    }
  };

  function bigBufferGeometry() {
    const positions = positionsArray();
    const hexGeos = positions.map((pos, i) => hexBufferGeometry(pos, i));
    const useGroups = true;
    return BufferGeometryUtils.mergeBufferGeometries(hexGeos, useGroups);

    function positionsArray() {
      return [ ...Array(ROW_COUNT).keys() ].reduce((arr, yInt) => {
        arr.push(...row(yInt));
        return arr;
      }, []);

      function row(yInt) {
        const tempPosVector = new THREE.Vector3();
        const isOdd = yInt % 2 !== 0;
        const yPos = yInt * Y_OFFSET;
        const startX = isOdd ? -19.5 * X_OFFSET : -20 * X_OFFSET;
        return [ ...Array(COUNT).keys() ].map(cellInt => {
          const xPos = startX + cellInt * X_OFFSET;
          tempPosVector.set(xPos, yPos, 0);
          return tempPosVector.clone();
        });
      }
    }

    function hexBufferGeometry(position, i) {
      const geo = hexGeometry.clone();
      const initMatrix = new THREE.Matrix4();
      const scale = new THREE.Vector3(1, 1, 1);
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(
        new THREE.Vector3(1, 0, 0), Math.PI / 2);
      initMatrix.compose(position, quaternion, scale);
      geo.applyMatrix4(initMatrix);

      return geo;
    }
  }

  /* const sphereGeometry = new THREE
  .SphereGeometry(12, 32, 32, -.26, -2.61, .78, 1.57);
const sphere = new THREE.Mesh(sphereGeometry, mat_three.clone())
sphere.position.set(0, 0, 20)
sphere.material.side = THREE.DoubleSide
sphere.material.transparent = false;
sphere.material.opacity = 1;
scene.add(sphere)*/

  /* function meshOfHexes() {
  const meshMesh = new THREE.Group();
  for (let i = 0; i < ROW_COUNT/2; i++) {
    if (i) {
      meshMesh.add(pairRow(i))
    } else {
      meshMesh.add(row())
    }
  }

  meshMesh.children = flattenChildren(meshMesh.children);
  return meshMesh;
}*/

/* function pairRow(yInt) {
    const pair = new THREE.Group()
    pair.name = `pair_hex_row_${Math.floor(yInt/2) + 1}`
    pair.add(row(yInt))
    pair.add(row(-yInt))
    return pair
  }

  function row(yInt=0) {
    const isOdd = yInt % 2 !== 0;
    const rowX = isOdd ? -(19.5 * 1.025) : -(20 * 1.025);
    const rowY = yInt * .75;
    const rowZ = 0;
    const row = new THREE.Group();
    row.name = `hex_row_${yInt}`;
    for (let i = 0; i < COUNT; i++) {
      const x = i * 1.05;
      const clone = hexGroup.clone();
      clone.position.set(x, clone.position.y, clone.position.z);
      clone.name = `cell_${i}_row_${yInt}`;
      row.add(clone);
    }
    row.position.set(rowX, rowY, rowZ);
    return row;
  }

  function flattenChildren(children) {
    return children.reduce(flattener, [])

    function flattener(accumulator, child) {
      const name = child.name;
      const cell = name.startsWith('cell_')
      const toFlatten = name.startsWith('hex_row') || name.startsWith('pair')
      if (cell) {
        child.updateWorldMatrix(true, true)
        accumulator.push(child);
        return accumulator;
      };
      if (toFlatten) {
        return accumulator.concat(flattenChildren(child.children));
      };
    };
  };*/
}
