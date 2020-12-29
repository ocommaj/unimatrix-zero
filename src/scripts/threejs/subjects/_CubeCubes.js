import Cube from './_Cube';
import { facingPlaneToBack } from '../animate';
import { spinPlane } from '../animate';

export default function CubeCubes({ count, spacing, cubeConfig }) {
  const { size, rotation, scale } = cubeConfig;
  const offsets = setOffsets(count, size, spacing);
  const boxes = makeCubes(size, offsets, rotation, scale);
  const getFacingPlane = () => getPlane('z', count - 1);
  let facingPlane = getFacingPlane();

  return {
    boxes,
    offsets,
    facingPlane,
    getFacingPlane,
    planeLoop,
    onClick,
  };

  function planeLoop(callback) {
    facingPlane = getFacingPlane();
    return facingPlaneToBack({
      callback,
      facingPlane,
      others: boxes.filter(box => !facingPlane.includes(box)),
      dBack: offsets[offsets.length - 1] - offsets[0],
      dForward: size * spacing,
    });
  }

  function getPlane(axis, atSlice = 1) {
    return boxes.filter(box => box.position[axis] === offsets[atSlice]);
  }

  function makeCubes(size, offsets, rotation, scale) {
    const posBox = (position) => Cube({ size, position, rotation, scale });
    const row = (y, z) => offsets.map((x) => posBox({ x, y, z }));
    const plane = (z) => [].concat.apply([], offsets.map((y) => row(y, z)));

    return [].concat.apply([], offsets.map(offset => plane(offset)));
  }

  function setOffsets(count, size, spacing) {
    // const offset = size * spacing;
    const offset = spacing >= size ? size * spacing : size * (spacing + size);
    const midpoint = Math.floor(count / 2);
    return Array.from({length: count}, (v, i) => {
      const delta = count % 2 === 1 ? i - midpoint : i - midpoint + size / 2;
      return delta * offset;
    });
  }

  function onClick(scene, mesh, axis, callback) {
    const sliceIdx = offsets.indexOf(mesh.position[axis]);
    const slice = getPlane(axis, sliceIdx);
    spinPlane({ scene, slice, axis }).play().then(() => callback());
  }
}
