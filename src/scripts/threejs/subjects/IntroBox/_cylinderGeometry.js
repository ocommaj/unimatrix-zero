import { CylinderGeometry } from 'three';

export default function introBoxCylinder() {
  const rad = 4.8;
  const height = 6;
  const radialSeg = 64;
  const heightSeg = 6;
  const openEnd = true;
  const thetaStart = 5.75;
  const thetaLength = 1;
  return new CylinderGeometry(
    rad, rad, height, radialSeg, heightSeg, openEnd, thetaStart, thetaLength
  );
}
