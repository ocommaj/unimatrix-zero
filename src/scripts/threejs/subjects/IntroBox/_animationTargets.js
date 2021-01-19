const largeWidth = {
  comma: {
    positions: [
      { x: '+=5.5', y: '-=.75', z: '+=2.1' },
      { z: '-=.1' }
    ],
    scale: { z: 0.5 },
    rotation: { y: -0.15 }
  },
  inner: {
    positions: { x: '+=7.25', y: '-=.25', z: '+=2' },
    scales: { x: 2.75, y: 4, z: 0.5 },
    materials: {
      opacity: 0.5,
      emissive: 0x525252,
      emissiveIntensity: 0.5,
      stagger: 0,
    },
  },
  introBoxGroup: {
    rotation: { y: '-=0.15' }
  },
  mainCube: {
    rotation: { y: '+=0.2' }
  },
  horizontal: {
    topPosition: { x: '+=7.25', y: '+=.75', z: '+=2.25' },
    bottomPosition: { x: '+=7.25', y: '-=1.5', z: '+=2.25'},
    scaleMid: { x: 5.4, y: 0.75 },
  },
  vertical: {
    leftPosition: { x: '+=6.9', y: '-=.3', z: '+=2.25' },
    rightPosition: { x: '+=7.6', y: '-=.3', z: '+=2.25'},
    scaleMid: { x: 0.5, y: 5.85 },
  },
  zeroScale: { x: 0, y: 0, z: 0 }
};

const smallWidth = {
  comma: {
    positions: [
      { x: '-=.6', y: '-=1.75', z: '+=10' },
      { z: '-=.25' }
    ],
    scale: { x: '+=.025', z: 0.5 },
    rotation: { x: -.15, y: -0.15 }
  },
  inner: {
    //positions: { x: '+=1.35', y: '+=0', z: '+=9.875' },
    positions: { x: '+=1.35', y: '-=1', z: '+=9.875' },
    scales: { x: 2.2, y: 4.5, z: 0.5 },
    materials: {
      opacity: 0.5,
      emissive: 0x525252,
      emissiveIntensity: 0.5,
      stagger: 0,
    },
  },
  introBoxGroup: {
    rotation: { y: '-=0.15' }
  },
  mainCube: {
    rotation: {}
  },
  horizontal: {
    //topPosition: { x: '+=1.25', y: '+=1.25', z: '+=10.25' },
    //topPosition: { x: '+=1.4', y: '+=1.5', z: '+=10.25' },
    topPosition: { x: '+=1.4', y: '+=.5', z: '+=10.25' },
    //bottomPosition: { x: '+=1.25', y: '-=1.25', z: '+=10.25' },
    //bottomPosition: { x: '+=1.4', y: '-=1.5', z: '+=10.25' },
    bottomPosition: { x: '+=1.4', y: '-=2.25', z: '+=10.25' },
    scaleMid: { x: 4.25, y: .5 }
  },
  vertical: {
    //leftPosition: { x: '+=.95', y: '+=0', z: '+=10.25' },
    leftPosition: { x: '+=.95', y: '-=1', z: '+=10.25' },
    //rightPosition: { x: '+=1.85', y: '+=0', z: '+=10.25' },
    rightPosition: { x: '+=1.85', y: '-=1', z: '+=10.25' },
    //scaleMid: { x: 0.25, y: 5.25 },
    scaleMid: { x: 0.375, y: 5.5 },
  },
  zeroScale: { x: 0, y: 0, z: 0 }
};

const targets = {
  largeWidth,
  desktop: largeWidth,
  mobile: smallWidth,
  iPhoneXXS: smallWidth,
};

export default targets;
