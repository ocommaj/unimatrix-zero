import { Vector3 } from 'three'

export default function positionDOMElement(inMeshGroup, camera) {
  const tempCenterVector = new Vector3()
  const {
    clientWidth: canvasWidth,
    clientHeight: canvasHeight,
  } = document.getElementById('canvas');
  const {
    style,
    clientWidth: elemWidth,
    clientHeight: elemHeight,
  } = document.getElementById('introBox');
  const target = inMeshGroup.getObjectByName('introBoxBG');
  const { device } = inMeshGroup.userData;
  target.updateWorldMatrix()
  target.geometry.computeBoundingBox();

  const { boundingBox } = target.geometry;
  boundingBox.getCenter(tempCenterVector);
  tempCenterVector.applyMatrix4(target.matrixWorld);
  tempCenterVector.project(camera)

  //console.dir(tempCenterVector)
  //console.log(`domElem width: ${elemWidth}`)
  //console.log(`domElem height: ${elemHeight}`)

  const offset = {
    x: (elemWidth * (device.type === 'desktop' ? .45 : .22)),
    y: (elemHeight * (device.type === 'desktop' ? .75 : .5))
  }

  const left = ((tempCenterVector.x * .5 + .5) * canvasWidth) - offset.x;
  const top = ((tempCenterVector.y * .5 + .5) * canvasHeight) - offset.y;

  //console.log(`left: ${left}`)
  //console.log(`top: ${top}`)

  style.visibility = 'visible';
  style.transform = `translate(${left}px, ${top}px) skew(0deg, -1deg)`;
  style.opacity = 1;
}
