export default function positionDOMElement(inMeshGroup, camera) {
  const { clientWidth, clientHeight } = document.getElementById('canvas');
  const { style } = document.getElementById('introBox');
  const target = inMeshGroup.getObjectByName('introBoxBG');
  target.geometry.computeBoundingBox();

  const { boundingBox } = target.geometry;
  boundingBox.max.project(camera);
  boundingBox.min.project(camera);

  const left = (boundingBox.min.x * 0.5 + 0.55) * clientWidth;
  const right = (boundingBox.max.x * -0.5 + 0.55) * clientWidth;
  const bottom = (boundingBox.min.y * 0.5 + 0.15) * clientHeight;
  const top = (boundingBox.max.y * -0.5 + 0.15) * clientHeight;
  const width = right - left;
  const height = bottom - top;

  style.visibility = 'visible';
  style.width = `${width}px`;
  style.height = `${height}px`;
  style.transform = `translate(${left}px, ${top}px) skew(0deg, -1deg)`;
  style.opacity = 1;
}
