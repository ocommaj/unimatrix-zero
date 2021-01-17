const largeWidth = {
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

};

const targets = {
  largeWidth,
  desktop: largeWidth,
};

export default targets;
