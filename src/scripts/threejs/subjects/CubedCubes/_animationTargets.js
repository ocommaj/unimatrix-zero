const largeWidth = {
  deviceType: 'desktop',
  duration: 0.8,
  positions: [
    { y: '+=1' },
    { x: '-=4.25' },
  ],
  scales: [
    { x: 0.7, y: 0.7, z: 0.7 },
  ],
  timing: {
    positions: ['<', '<.2'],
    scales: ['<'],
  },
};

const smallWidth = {
  deviceType: 'mobile',
  duration: 1.2,
  positions: [
    { x: '-=1.5', z: '-=1.5' },
    { x: '+=1.5' },
  ],
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
