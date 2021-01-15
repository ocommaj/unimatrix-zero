import { Group, BufferGeometry, Vector3 } from 'three';
import {
  BufferGeometryUtils,
} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import Cube from './_Cube';
import { facingPlaneToBack } from '../animate';
import { spinPlane } from '../animate';

export default function CubeCubes({ count, spacing, cubeConfig }) {
  const { size, rotation, scale } = cubeConfig;
  const offsets = setOffsets(count, size, spacing);
  const boxes = makeCubes(size, offsets, rotation, scale);
  const CubeCubes = new Group();
  CubeCubes.add(...boxes);

  let spinCount = 0;
  let facingPlane = CubeCubes.children.slice(-Math.pow(count, 2));
  facingPlane.forEach(cube => illuminate(cube));

  return {
    group: CubeCubes,
    facingPlane,
    getFacingPlane,
    offsets,
    onClick,
    planeLoop,
    wrapBackgroundGeometry,
  };

  function wrapBackgroundGeometry(bgGeometry) {
    const { hiddenIndices } = bgGeometry.userData;
    const cubedCubesBounds = getPlaneBoundingBox();
    const indicesToHide = filterGeosToHide();
    if (hiddenIndices.length) {
      const indicesToShow = filterGeosToShow(indicesToHide);
      showGeos(indicesToShow);
    }
    hideGeos(indicesToHide);
    hiddenIndices.push(...indicesToHide);

    function getPlaneBoundingBox() {
      const offset = new Vector3();
      const copiedGeos = copyCubeGeos();
      const copiedPlane = BufferGeometryUtils.mergeBufferGeometries(copiedGeos);
      copiedPlane.computeBoundingBox();
      const boundingBox = copiedPlane.boundingBox;
      offset.set(-0.5, 0.75 * 12, 0);
      boundingBox.translate(offset);
      boundingBox.expandByScalar(1.0125);
      copiedPlane.dispose();
      return boundingBox;

      function copyCubeGeos() {
        const planeSlice = CubeCubes.children.filter(cube => {
          return cube.position.z === 0;
        });

        return planeSlice.map(cube => {
          const copy = new BufferGeometry();
          cube.updateMatrixWorld();
          copy.copy(cube.geometry);
          copy.applyMatrix4(cube.matrixWorld);
          copy.computeBoundingBox();
          return copy;
        });
      }
    }

    function filterGeosToShow(indicesToHide) {
      return hiddenIndices.filter(value => !indicesToHide.includes(value));
    }

    function filterGeosToHide() {
      const indicesToHide = [];
      const bgGeoBounds = bgGeometry.userData.mergedUserData;
      bgGeoBounds.forEach((bounds, i) => {
        if (cubedCubesBounds.containsBox(bounds)) indicesToHide.push(i);
      });
      return indicesToHide;
    }

    function showGeos(indicesToShow) {
      const geos = bgGeometry.groups;
      indicesToShow.forEach(value => {
        if (value) {
          const spliceIdx = hiddenIndices.indexOf(value);
          hiddenIndices.splice(spliceIdx, 1);
          geos[value].materialIndex = value % 3;
        }
      });
    }

    function hideGeos(indicesToHide) {
      const { hiddenMaterialIdx } = bgGeometry.userData;
      const geos = bgGeometry.groups;
      indicesToHide.forEach(value => {
        geos[value].materialIndex = hiddenMaterialIdx;
      });
    }

  }

  function getFacingPlane() {
    return CubeCubes.children.slice(-Math.pow(count, 2));
  }

  function illuminate(cube) {
    const innerLight = cube.children[0];
    if (innerLight.visible === false) {
      innerLight.visible = true;
      innerLight.intensity = 0.5;
    }
  }

  function planeLoop(callback) {
    const toMoveBack = CubeCubes.children.splice(-Math.pow(count, 2));
    CubeCubes.children.unshift(...toMoveBack);
    facingPlane = toMoveBack;
    return facingPlaneToBack({
      callback,
      facingPlane,
      others: CubeCubes.children.filter(box => !facingPlane.includes(box)),
      dBack: offsets[offsets.length - 1] - offsets[0],
      dForward: size * spacing,
    });
  }

  function getPlane(axis, atPosition) {
    const boxes = CubeCubes.children;
    if (axis === 'z') {
      return boxes.filter(box => {
        return box.position.z === offsets[offsets.length - 1];
      });
    }

    const round = (float) => (Math.ceil(float * 2 - 0.5) / 2);
    const rounded = round(atPosition);
    return boxes.filter(box => round(box.position[axis]) === rounded);

  }

  function makeCubes(size, offsets, rotation, scale) {
    const posBox = (position) => Cube({ size, position, rotation, scale });
    const row = (y, z) => offsets.map((x) => posBox({ x, y, z }));
    const plane = (z) => [].concat.apply([], offsets.map((y) => row(y, z)));

    return [].concat.apply([], offsets.map(offset => plane(offset)));
  }

  function setOffsets(count, size, spacing) {
    const offset = spacing >= size ? size * spacing : size * (spacing + size);
    const midpoint = Math.floor(count / 2);
    return Array.from({length: count}, (v, i) => {
      const delta = count % 2 === 1 ? i - midpoint : i - midpoint + size / 2;
      return delta * offset;
    });
  }

  function onClick(scene, mesh, callback) {
    if (!mesh.userData.isClickable) return;
    const axis = spinCount % 2 === 0 ? 'y' : 'x';
    const atPosition = mesh.position[axis];
    const slice = getPlane(axis, atPosition);
    const sliceClone = new Group();
    CubeCubes.add(sliceClone);
    sliceClone.updateWorldMatrix(true, false);

    for (const box of slice) {
      const clone = box.clone();
      clone.scale.set(1, 1, 1);
      sliceClone.add(clone);
      box.visible = false;
    }

    spinPlane({ scene, sliceClone, axis }).play()
      .then(() => {
        for (const box of slice) box.visible = true;
        CubeCubes.remove(sliceClone);
        spinCount++;
        callback();
      });
  }
}
