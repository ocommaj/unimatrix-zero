import { Vector3 } from 'three'
import menuSVG from '../../../assets/icons/menu.svg'

export default function CommaMenu() {
  const menuButton = document.createElement('button');
  const menuIcon = document.createElement('object');
  menuButton.id = "menuButton"
  menuIcon.id = "commaMenuIcon";
  menuIcon.type = "image/svg+xml";
  menuIcon.data = menuSVG;

  menuButton.appendChild(menuIcon)
  menuIcon.addEventListener('load', styleSVG)
  return {
    showMenuIcon
  }

  function showMenuIcon() {
    const { camera, subjects: { comma: { mesh } } } = window.scene.userData;
    document.body.appendChild(menuButton)
    positionDOMElement(menuButton, mesh, camera)
  }
}

function styleSVG(e) {
  const { contentDocument } = e.target;
  const rects = contentDocument.querySelectorAll('.cls-2');
  const fill = 'linear-gradient(40deg, #be95ff, #c6c6c6, #ff8389)'
  for (let i = 0; i < rects.length; i++) {
    rects[i].style.transition = 'opacity .7s ease;'
    rects[i].style.opacity = 1;
    rects[i].style.boxShadow = '0px 2px 2px #6f6f6f;'
  }
}

function positionDOMElement(element, target, camera) {
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

  const x = (tempCenterVector.x *  .5 + .5) * canvasWidth + 16;
  const y = (tempCenterVector.y * -.5 + .5) * canvasHeight - 4;
  element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
}
