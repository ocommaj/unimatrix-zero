const largeWidth = {
  duration: 0.8,
  positions: [
    { y: '+=.5' },
    { x: '-=3.75' },
  ],
  rotations: {},
  scales: [
    { x: 0.7, y: 0.7, z: 0.7 },
  ],
  timing: {
    positions: ['<', '<.2'],
    scales: ['<'],
  },
};

const smallWidth = {
  duration: 1.2,
  positions: [
    //{ x: '-=1.5', z: '-=1.5' },
    { z: '-=1.5' },
    //{ x: '+=1.5' },
  ],
  rotations: { x: 0, y: '+=6.28', z: 0 },
  scales: [
    { x: 0.5, y: 0.5, z: 0.5 },
  ],
  timing: {
    positions: ['+=.2', '-=.4'],
    scales: ['<'],
  },
};

const targets = {
  largeWidth,
  desktop: largeWidth,
  smallWidth,
  mobile: smallWidth,
};

export default targets;
