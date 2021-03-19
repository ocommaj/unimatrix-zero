import { Vector3 } from 'three';
import { ContentBox } from '../../../browserElements';

export default async function positionDOMElement(inMeshGroup, camera) {
  const element = document.getElementById('contentBox')
    || await ContentBox('intro');
  const {
    style,
    clientWidth: elemWidth,
    clientHeight: elemHeight,
  } = element;

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

  const tempMax = new Vector3()
  const tempMin = new Vector3()

  tempMax.copy(boundingBox.max)
  tempMin.copy(boundingBox.min)

  tempMax.project(camera)
  tempMin.project(camera)

  const projectTop = ((tempMax.y * .5) * canvasHeight)
  const projectBottom = ((tempMin.y * .5 + .75) * canvasHeight)

  const offsetXfactor = device.type === 'desktop' ? .45 : .225;
  const offsetYfactor = .775;

  const maxHeight = (projectBottom - projectTop) * offsetYfactor

  const offset = {
    x: (elemWidth * offsetXfactor),
    y: (maxHeight * offsetYfactor)
  }

  const left = ((tempCenterVector.x * .5 + .5) * canvasWidth) - offset.x;
  const top = ((tempCenterVector.y * .5 + .5) * canvasHeight) - offset.y;

  style.visibility = 'visible';
  style.maxHeight = `${maxHeight}px`;
  style.transform = `translate(${left}px, ${top}px) skew(0deg, -1deg)`;
  style.opacity = 1;
}
