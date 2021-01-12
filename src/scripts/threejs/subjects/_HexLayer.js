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

  camera.getWorldPosition(camPosVector);

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

}
