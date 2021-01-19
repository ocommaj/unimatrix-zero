const START_VISIBLE = false;
const START_SCALE = { x: 0, y: 0, z: 0 };
const START_MATERIAL = { opacity: 1 };
const TO_TOP_VISIBLE = true;
const TO_TOP_SCALE = { x: 1, y: 1, z: 1 }
const TO_TOP_MATERIAL = { opacity: .4 }

const startValues = {
  largeWidth: {
    visible: START_VISIBLE,
    scale: START_SCALE,
    material: START_MATERIAL,
    position: { x: -4, y: -2, z: 4 },
    rotation: { x: 0.1, y: -0.5, z: -0.6 }
  },
  narrowWidth: {
    visible: START_VISIBLE,
    scale: START_SCALE,
    position: { x: -.25, y: -3, z: 8 },
    rotation: { x: 0.1, y: -0.5, z: -0.6 }
  }
}

const toTopValues = {
  largeWidth: {
    visible: TO_TOP_VISIBLE,
    scale: TO_TOP_SCALE,
    material: TO_TOP_MATERIAL,
    position: { y: '+=10', z: '+=2', duration: 4 },
  },
  narrowWidth: {
    visible: TO_TOP_VISIBLE,
    scale: TO_TOP_SCALE,
    material: TO_TOP_MATERIAL,
    position: { y: '+=15', z: '+=4', duration: 4 }
  }
}

const targets = {
  desktop: {
    start: startValues.largeWidth,
    toTop: toTopValues.largeWidth,
  },
  mobile: {
    start: startValues.narrowWidth,
    toTop: toTopValues.narrowWidth,
  }
}

export default targets;
