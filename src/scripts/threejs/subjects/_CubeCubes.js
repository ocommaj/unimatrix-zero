import { Group } from 'three';
import Cube from './_Cube';
import { facingPlaneToBack } from '../animate';
import { spinPlane } from '../animate';

export default function CubeCubes({ count, spacing, cubeConfig }) {
  const { size, rotation, scale } = cubeConfig;
  const offsets = setOffsets(count, size, spacing);
  const boxes = makeCubes(size, offsets, rotation, scale);
  const CubeCubes = new Group();
  CubeCubes.add(...boxes);

  let facingPlane = CubeCubes.children.slice(-Math.pow(count, 2));
  facingPlane.forEach(cube => illuminate(cube));

  return {
    group: CubeCubes,
    offsets,
    facingPlane,
    getFacingPlane,
    planeLoop,
    onClick,
  };

  function getFacingPlane() {
    return CubeCubes.children.slice(-Math.pow(count, 2));
  }

  function illuminate(cube) {
    cube.userData.innerLight.intensity = 0.7;
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

  function getPlane({axis, atPosition = null, fromBox = null}) {
    const boxes = CubeCubes.children;
    if (axis === 'z' && !atPosition && !fromBox) {
      return boxes.filter(box => {
        return box.position.z === offsets[offsets.length - 1];
      });
    }
    if (atPosition) {
      return boxes.filter(box => box.position[axis] === atPosition);
    }
    if (fromBox) {
      return boxes.filter(box => box.position[axis] === fromBox.position[axis]);
    }

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

  function onClick(scene, mesh, axis, callback) {
    if (!mesh.userData.isClickable) return;
    const slice = getPlane({ axis, fromBox: mesh });
    const sliceClone = new Group();
    CubeCubes.add(sliceClone);
    sliceClone.updateWorldMatrix(true, true);

    for (const box of slice) {
      const clone = box.clone();
      clone.scale.set(1, 1, 1);
      sliceClone.add(clone);
      box.visible = false;
    }

    spinPlane({scene, sliceClone, axis }).play()
      .then(() => {
        for (const box of slice) box.visible = true;
        CubeCubes.remove(sliceClone);
        callback();
      });
  }
}
