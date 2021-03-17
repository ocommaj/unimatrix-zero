import { Vector3 } from 'three';
import { IntroBox } from '../../../browserElements';

export default function positionDOMElement(inMeshGroup, camera) {
  const introBoxDOM = document.getElementById('introBox') || IntroBox();
  const {
    style,
    clientWidth: elemWidth,
    clientHeight: elemHeight,
  } = introBoxDOM;

  const tempCenterVector = new Vector3()
  const {
    clientWidth: canvasWidth,
    clientHeight: canvasHeight,
  } = document.getElementById('canvas');



  const target = inMeshGroup.getObjectByName('introBoxBG');
  const { device } = inMeshGroup.userData;
  target.updateWorldMatrix()
  target.geometry.computeBoundingBox();

  const { boundingBox } = target.geometry;
  boundingBox.getCenter(tempCenterVector);
  tempCenterVector.applyMatrix4(target.matrixWorld);
  tempCenterVector.project(camera)

  const offsetXfactor = device.type === 'desktop' ? .45 : .225;
  const offsetYfactor = .725;
  const offset = {
    x: (elemWidth * offsetXfactor),
    y: (elemHeight * offsetYfactor)
  }

  const left = ((tempCenterVector.x * .5 + .5) * canvasWidth) - offset.x;
  const top = ((tempCenterVector.y * .5 + .5) * canvasHeight) - offset.y;

  style.visibility = 'visible';
  style.transform = `translate(${left}px, ${top}px) skew(0deg, -1deg)`;
  style.opacity = 1;
}
