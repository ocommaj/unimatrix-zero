const largeWidth = {
  positions: { x: '+=7.25', y: '-=.25', z: '+=2' },
  scales: { x: 2.75, y: 4, z: 0.5 },
  comma: {
    pos: { x: '+=5.5', y: '-=.75', z: '+=2.1' },
  },
  vertical: {
    leftPos: { x: '+=6.9', y: '-=.3', z: '+=2.25' },
    rightPos: { x: '+=7.6', y: '-=.3', z: '+=2.25'},
    scales: { x: 0.5, y: 3.75 },
  },
  horizontal: {
    topPos: { x: '+=7.25', y: '+=.75', z: '+=2.25' },
    bottomPos: { x: '+=7.25', y: '-=1.5', z: '+=2.25'},
    scales: { x: 5.4, y: 0.75 },
  },
};

const targets = {
  largeWidth,
  desktop: largeWidth,
};

export default targets;
