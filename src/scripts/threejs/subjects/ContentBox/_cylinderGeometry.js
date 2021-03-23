import { CylinderGeometry } from 'three';

export default function introBoxCylinder(deviceType) {
  const config = {
    desktop: {
      radiusTop: 4.8,
      radiusBottom: 4.8,
      height: 6,
      radialSegments: 64,
      heightSegments: 1,
      openEnded: true,
      thetaStart: 5.75,
      thetaLength: 1
    },
    mobile: {
      radiusTop: 5.25,
      radiusBottom: 5.25,
      height: 5,
      radialSegments: 64,
      heightSegments: 1,
      openEnded: true,
      thetaStart: 6,
      thetaLength: .725
    }
  }
  return new CylinderGeometry( ...Object.values(config[deviceType]) );
}
