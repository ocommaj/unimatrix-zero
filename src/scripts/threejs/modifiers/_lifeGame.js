import { Color } from 'three';

export default function runLife(geometryArray, userData) {
  const ALIVE = 1;
  const HIDDEN = 4;
  const {
    cellsPerRow,
    hiddenIndices,
    rowCount,
    aliveMaterialIdx,
    hiddenMaterialIdx,
  } = userData;
  const cells = [ ...geometryArray ];
  const cellMap = cells.map(({ materialIndex }, i) => {
    return cellModel(materialIndex, i);
  });
  const rowMap = cellMap.reduce(mapRows, []);

  return { initialSpawn, evolve };

  function initialSpawn() {
    setAlive(spawnRandom(0.5)).then(() => evolve());
  }

  function evolve() {
    updateLivingModel().then((updatedMap) => updateRender(updatedMap));
  }

  function updateRender(updatedMap) {
    updatedMap.forEach(cellModel => {
      cells[cellModel.idx].materialIndex = cellModel.materialIdx;
      geometryArray[cellModel.idx] = cells[cellModel.idx];
    });
  }

  function updateLivingModel() {
    return new Promise(resolve => {
      const updated = cellMap.map(cellModel => {
        cellModel.updateLivingState();
        return cellModel;
      });
      resolve(updated);
    });
  }

  function cellModel(materialIndex, idx) {
    const originalMaterial = materialIndex;
    const rowIdx = Math.floor(idx / cellsPerRow);
    const cellIdx = idx - (rowIdx * cellsPerRow);
    const oddRow = rowIdx % 2;
    const nextCell = oddRow ? cellIdx + 1 : cellIdx - 1;
    const neighborRows = [rowIdx, rowIdx + 1, rowIdx - 1];
    const neighbors = [
      [cellIdx - 1, cellIdx + 1],
      [cellIdx, nextCell],
      [cellIdx, nextCell],
    ];

    if (rowIdx === 0) neighborRows.pop();
    if (rowIdx === rowCount - 1) neighborRows.splice(1, 1);
    if (neighborRows.length === 2) neighbors.pop();

    return {
      idx,
      rowIdx,
      neighbors,
      originalMaterial,
      updateLivingState,
      getNeighborCount,
      setMaterialIdx,
    };

    async function updateLivingState() {
      await this.getNeighborCount();
      const prevState = this.isAlive;
      switch (this.aliveNeighborCount) {
        case 2:
          this.isAlive = this.isAlive;
          break;
        case 3:
          this.isAlive = 1;
          break;
        /* case 4:
          this.isAlive = 1;
          break;*/
        default:
          this.isAlive = 0;
          break;
      }
      this.shouldUpdate = prevState !== this.isAlive;
      this.setMaterialIdx();
    }

    function getNeighborCount() {
      const aliveNeighbors = this.neighbors.reduce(
        (accumulator, adjCells, row) => {
          const filtered = rowMap[neighborRows[row]]
            .slice(adjCells[0], adjCells[1] + 1).filter(cell => cell.isAlive);

          accumulator.push(...filtered);
          return accumulator;
        }, []);
      this.aliveNeighborCount = aliveNeighbors.length;
    }

    function setMaterialIdx() {
      const isHidden = hiddenIndices.includes(this.idx);
      if (isHidden) {
        this.materialIdx = hiddenMaterialIdx;
        return;
      }

      this.materialIdx = this.isAlive
        ? aliveMaterialIdx
        : this.originalMaterial;
    }
  }

  function mapRows(accumulator, cell) {
    const rowIdx = cell.rowIdx;
    if (!accumulator[rowIdx]) {
      accumulator[rowIdx] = [];
    }
    accumulator[rowIdx].push(cell);
    return accumulator;
  }

  function setAlive(atIndices) {
    return new Promise(resolve => {
      atIndices.forEach(idx => { cellMap[idx].isAlive = ALIVE; });
      resolve();
    });
  }

  function spawnRandom(percentage) {
    const randomSrc = new Set();
    const spawnCount = Math.floor(cellMap.length * percentage);
    while (randomSrc.size < spawnCount) {
      let randInt = Math.floor(Math.random() * cellMap.length);
      randomSrc.add(randInt);
    }
    return randomSrc;
  }
}
