import { Vector3 } from 'three';
import menuSVG from '../../assets/icons/menu.svg';

export default function MenuButton() {
  const menuButton = document.createElement('button');
  const menuIcon = document.createElement('object');

  menuButton.id = "menuButton"
  menuIcon.id = "commaMenuIcon";
  menuIcon.type = "image/svg+xml";
  menuIcon.data = menuSVG;

  menuButton.appendChild(menuIcon)

  menuButton.addEventListener('click', clickHandler)
  menuIcon.addEventListener('load', styleSVG)

  return {
    showMenuIcon
  }

  function showMenuIcon() {
    document.body.appendChild(menuButton)
    positionDOMElement(menuButton)
  }
}

function styleSVG(e) {
  const { contentDocument } = e.target;
  const rects = contentDocument.querySelectorAll('.cls-2');

  for (let i = 0; i < rects.length; i++) {
    rects[i].style.transition = 'opacity .7s ease;'
    rects[i].style.opacity = 1;
    rects[i].style.boxShadow = '0px 2px 2px #6f6f6f;'
  }
}

function positionDOMElement(element) {
  const {
    camera,
    device: { type: deviceType },
    subjects: { comma: { mesh: target } }
  } = window.scene.userData;

  console.log(deviceType)

  const tempCenterVector = new Vector3();
  const {
    clientWidth: canvasWidth,
    clientHeight: canvasHeight,
  } = document.getElementById('canvas');

  target.updateWorldMatrix();
  target.geometry.computeBoundingBox();

  const { boundingBox } = target.geometry;
  boundingBox.getCenter(tempCenterVector);
  tempCenterVector.applyMatrix4(target.matrixWorld);
  tempCenterVector.project(camera);

  const xOffset = deviceType === "mobile" ? 4 : 16;
  const yOffset = deviceType === "mobile" ? 6 : 4;

  const x = (tempCenterVector.x *  .5 + .5) * canvasWidth + xOffset;
  const y = (tempCenterVector.y * -.5 + .5) * canvasHeight - yOffset;
  element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
}

function clickHandler() {
  console.log('clicky')
}
