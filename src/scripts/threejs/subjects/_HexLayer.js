import {
  Color,
  CylinderBufferGeometry,
  Vector3, Matrix4, Quaternion,
  Mesh, MeshLambertMaterial,
} from 'three';
import {
  BufferGeometryUtils,
} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LifeGame } from '../modifiers';

export default function HexLayer(scene, camera) {
  const camPosVector = new Vector3();
  // const WHITE = new Color( 0xfff );
  const YELLOW = new Color(0xf1c21b);
  const BLUE_60 = new Color(0x0f62fe);
  const BLUE_40 = new Color(0x78a9ff);
  const GRAY_30 = new Color(0xc6c6c6);
  const GRAY_10 = new Color(0xf4f4f4);
  const GRAY_20 = new Color(0xe0e0e0);
  const RED_50 = new Color(0xfa4d56);
  const GREEN_50 = new Color(0x24a148);

  const mat_one = new MeshLambertMaterial({
    color: GRAY_10,
    transparent: true,
    opacity: 0.2,
  });
  const mat_two = new MeshLambertMaterial({
    color: BLUE_40,
    transparent: true,
    opacity: 0.5,
  });

  const mat_three = mat_one.clone();
  mat_three.opacity = 0.3;
  mat_three.transparent = true;
  const mat_four = mat_one.clone();
  mat_four.emissive = 0xfff;
  mat_four.transparent = false;
  const mat_five = mat_one.clone();
  mat_five.opacity = 0;
  // mat_four.emissiveIntensity = 1;

  const hexGeometry = new CylinderBufferGeometry(0.5, 0.5, 0.25, 6, 1);

  camera.getWorldPosition(camPosVector);

  const { aspect } = camera;
  const { count: COUNT, rowCount: ROW_COUNT } = generateCellCount(aspect);
  const X_OFFSET = 1.025;
  const Y_OFFSET = 0.75;
  const HIDDEN_MATERIAL_IDX = 4;
  const ALIVE_MATERIAL_IDX = 3;

  const hexBuffer = bigBufferGeometry();
  hexBuffer.userData.aliveMaterialIdx = ALIVE_MATERIAL_IDX;
  hexBuffer.userData.hiddenMaterialIdx = HIDDEN_MATERIAL_IDX;
  hexBuffer.userData.cellOffsetY = Y_OFFSET;
  hexBuffer.userData.cellsPerRow = COUNT;
  hexBuffer.userData.rowCount = ROW_COUNT;
  hexBuffer.userData.hiddenIndices = [];
  hexBuffer.groups.forEach((group, i) => { group.materialIndex = i % 3; });
  const mesh = new Mesh(
    hexBuffer,
    [mat_one, mat_two, mat_three, mat_four, mat_five]);

  mesh.position.set(0, -Y_OFFSET * (ROW_COUNT / 2), 0);
  scene.add(mesh);

  const life = new LifeGame(hexBuffer.groups, hexBuffer.userData);
  this.mesh = mesh;
  this.playLife = () => life.generation();
  this.update = ({ nowSecond }) => {
    if (nowSecond && !(nowSecond % 3) && life.lastTime !== nowSecond) {
      life.lastTime = nowSecond;
      life.generation(nowSecond);
    }
  };

  function generateCellCount(aspectRatio) {
    if (aspectRatio > 1) {
      return { count: 40, rowCount: 24 };
    }
    if (aspectRatio < 1 && aspectRatio > 0.7) {
      return { count: 28, rowCount: 28 };
    }
    if (aspectRatio < 0.7) {
      return { count: 18, rowCount: 38 };
    }
  }

  function bigBufferGeometry() {
    const positions = positionsArray();
    const hexGeos = positions.map((pos, i) => hexBufferGeometry(pos));
    const useGroups = true;
    return BufferGeometryUtils.mergeBufferGeometries(hexGeos, useGroups);

    function positionsArray() {
      return [ ...Array(ROW_COUNT).keys() ].reduce((arr, yInt) => {
        arr.push(...row(yInt));
        return arr;
      }, []);

      function row(yInt) {
        const tempPosVector = new Vector3();
        const isOdd = yInt % 2 !== 0;
        const yPos = yInt * Y_OFFSET;
        const startX = isOdd
          ? -(COUNT / 2 * X_OFFSET - 0.5)
          : -(COUNT / 2 * X_OFFSET);
        return [ ...Array(COUNT).keys() ].map(cellInt => {
          const xPos = startX + cellInt * X_OFFSET;
          tempPosVector.set(xPos, yPos, 0);
          return tempPosVector.clone();
        });
      }
    }

    function hexBufferGeometry(position) {
      const geo = hexGeometry.clone();
      const initMatrix = new Matrix4();
      const scale = new Vector3(1, 1, 1);
      const quaternion = new Quaternion();
      quaternion.setFromAxisAngle(
        new Vector3(1, 0, 0), Math.PI / 2);
      initMatrix.compose(position, quaternion, scale);
      geo.morphTargetsRelative = true;
      geo.applyMatrix4(initMatrix);
      geo.computeBoundingBox();
      geo.userData = geo.boundingBox;
      return geo;
    }
  }

}
