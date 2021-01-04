import cameraZoomOut from './_cameraZoomout';
import hiTimelines from './_Hi';
import facingPlaneToBack from './_facingPlaneToBack';
import showIntroBox from './_showIntroBox';
import shrinkCube from './_shrinkCube';
import spinPlane from './_spinPlane';

function meshAnimationProperties(meshArray) {
  return meshArray.reduce((properties, mesh) => {
    properties.positions.push(mesh.position);
    properties.rotations.push(mesh.rotation);
    properties.scales.push(mesh.scale);
    properties.materials.push(mesh.material);
    return properties;
  }, { positions: [], rotations: [], scales: [], materials: [] });
}

export {
  meshAnimationProperties,
  cameraZoomOut,
  hiTimelines,
  facingPlaneToBack,
  showIntroBox,
  shrinkCube,
  spinPlane,
};
