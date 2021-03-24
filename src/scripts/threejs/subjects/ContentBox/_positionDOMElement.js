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

  const { contentBoxConfig: deviceConfig } = device;
  const { offsetXfactor, offsetYfactor } = deviceConfig;

  const projectTop = ((tempMax.y * .5) * canvasHeight)
  const projectBottom = ((tempMin.y * .5 + offsetYfactor) * canvasHeight)
  const projectLeft = ((tempMin.x * .5) * canvasWidth)
  const projectRight = ((tempMax.x * .5) * canvasWidth)

  const maxHeight = ((projectBottom - projectTop) * offsetYfactor)
  const maxWidth = setMaxWidth(canvasWidth)

  function setMaxWidth(canvasWidth) {
    if (canvasWidth <= 428) {
      return canvasWidth * .65
    } else if (canvasWidth <= 1440) {
      return 300
    } else {
      return 350
    }
  }

  const offset = {
    x: (maxWidth * offsetXfactor),
    y: (maxHeight * offsetYfactor)
  }

  const left = ((tempCenterVector.x * .5 + .5) * canvasWidth) - offset.x;
  //const right = ((tempCenterVector.x * .5 + .5) * canvasWidth) + offset.x;
  const top = ((tempCenterVector.y * .5 + .5) * canvasHeight) - offset.y;
  const bottom = ((tempCenterVector.y * .5 - .5) * canvasHeight);

  style.height = `${maxHeight}px`;
  style.top = `${top}px`;
  style.bottom = `${top + maxHeight}px`;
  style.left = `${left}px`;
  style.opacity = 1;
  style.maxWidth = `${maxWidth}px`;
}
