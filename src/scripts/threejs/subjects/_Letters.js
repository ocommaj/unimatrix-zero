export { makeUpperH, makeLowerI, notInLetters };

function makeUpperH(boxArray) {
  const side = Math.sqrt(boxArray.length);
  const col = () => Array.from({length: side}, (_, i) => side * i);
  const verts = [col(), col().map(i => i + side - 2)];
  const beamSlice = [
    verts[0][Math.floor(side / 2)] + 1,
    verts[1][Math.floor(side / 2)],
  ];
  const vertIndices = [ ...verts[0], ...verts[1] ];
  const boxes = vertIndices.map(i => boxArray[i]);
  const beamBoxes = boxArray.slice(beamSlice[0], beamSlice[1]);
  boxes.push(...beamBoxes);

  return { boxes, beamBoxes };
}

function makeLowerI(boxArray, colPosition = 'last') {
  const side = Math.sqrt(boxArray.length);
  const offset = colPosition === 'last' ? side - 1 : 0;
  const indices = Array.from({length: side}, (_, i) => side * i + offset);
  indices.splice(indices.length - 2, 1);

  const boxes = indices.map(i => boxArray[i]);
  return {
    boxes,
    dot: boxes[boxes.length - 1],
  };
}

function notInLetters(face, letters = []) {
  const boxes = face.filter(box => {
    for (const letter of letters) {
      if (letter.boxes.includes(box)) return false;
    }
    return true;
  });

  return { boxes };
}
