
export default function runLife(geometryArray, userData) {
  const ALIVE = 1;
  const SPAWN_RATE = 0.4;
  const {
    cellsPerRow,
    hiddenIndices,
    rowCount,
    aliveMaterialIdx,
    hiddenMaterialIdx,
  } = userData;
  const cellMap = mapCells(geometryArray);
  const rowMap = cellMap.reduce(mapRows, []);
  let updatedCounts = [];

  this.generation = (lastUpdate = 0) => generation(lastUpdate);

  function mapCells(geometryArray) {
    return geometryArray.map(({ materialIndex }, i) => {
      return cellModel(materialIndex, i);
    });
  }

  async function generation(lastUpdate) {
    if (!lastUpdate) {
      initialSpawn();
      return;
    }
    const updateCount = await evolve();
    if (!updateCount) initialSpawn();
  }

  function initialSpawn() {
    setAlive(spawnRandom(SPAWN_RATE)).then(() => evolve());
  }

  async function evolve() {
    let response;
    response = await updateLivingModel().then(() => updateRender());
    return response;
  }

  function updateRender() {
    const filtered = cellMap.filter(cellModel => cellModel.shouldUpdate);
    const countToUpdate = filtered.length;
    if (updatedCounts.length) {
      if (countToUpdate && !checkRepeatUpdates(countToUpdate, 4)) {
        updatedCounts.push(countToUpdate);
        filtered.forEach(cellModel => {
          geometryArray[cellModel.idx].materialIndex = cellModel.materialIndex;
        });
        return countToUpdate;
      }

      updatedCounts = [];
      return 0;
    }

    cellMap.forEach((cellModel, i) => {
      geometryArray[i].materialIndex = cellModel.materialIndex;
    });
    updatedCounts.push(countToUpdate);
    return countToUpdate;

    function checkRepeatUpdates(changeCellsCount, numberOfPrevious) {
      const checkAncestors = updatedCounts.slice(-numberOfPrevious);
      if (!checkAncestors.length) return false;
      return checkAncestors.every(previous => previous === changeCellsCount);
    }
  }

  function updateLivingModel() {
    return new Promise(resolve => {
      cellMap.forEach(cellModel => cellModel.updateLivingState());
      resolve();
    });
  }

  function cellModel(materialIndex, idx) {
    const originalMaterial = materialIndex;
    const rowIdx = Math.floor(idx / cellsPerRow);
    const cellIdx = idx - (rowIdx * cellsPerRow);
    const oddRow = rowIdx % 2;
    const nextCell = oddRow ? cellIdx + 1 : cellIdx - 1;
    const neighborRows = rowIdx && rowIdx !== rowCount - 1
      ? [rowIdx, rowIdx + 1, rowIdx - 1]
      : [rowIdx, rowIdx + 1];
    const neighbors = cellIdx ? [
      [cellIdx - 1, cellIdx + 1],
      [cellIdx, nextCell],
      [cellIdx, nextCell],
    ] : [
      [1],
      [0],
      [0],
    ];

    if (cellIdx === cellsPerRow - 1) neighbors[0] = [cellIdx - 1];
    if (cellIdx === cellsPerRow - 1 && oddRow) {
      neighbors[1].pop();
      neighbors[2].pop();
    }
    if (!cellIdx && oddRow) {
      neighbors[1].push(1);
      neighbors[2].push(1);
    }

    if (!rowIdx) neighbors.pop();
    if (rowIdx === rowCount - 1) neighborRows[1] = rowIdx - 1;

    return {
      idx,
      cellIdx,
      rowIdx,
      neighbors,
      neighborRows,
      originalMaterial,
      updateLivingState,
      getNeighborCount,
      setMaterialIdx,
    };

    function updateLivingState() {
      this.getNeighborCount();
      const prevState = this.isAlive;
      switch (this.aliveNeighborCount) {
        case 2:
          this.isAlive = this.isAlive;
          break;
        case 3:
          this.isAlive = 1;
          break;
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
          const neighborRow = rowMap[neighborRows[row]];
          const aliveCells = adjCells.filter(cellIdx => {
            if (neighborRow !== undefined) {
              return neighborRow[cellIdx].isAlive;
            }
          });
          accumulator.push(...aliveCells);
          return accumulator;
        }, []);
      this.aliveNeighborCount = aliveNeighbors.length;
    }

    function setMaterialIdx() {
      const isHidden = hiddenIndices.includes(this.idx);
      if (isHidden) {
        this.materialIndex = hiddenMaterialIdx;
        return;
      }

      this.materialIndex = this.isAlive
        ? aliveMaterialIdx
        : this.originalMaterial;
    }
  }

  function mapRows(accumulator, cellModel) {
    const rowIdx = cellModel.rowIdx;
    if (!accumulator[rowIdx]) {
      accumulator[rowIdx] = [];
    }
    accumulator[rowIdx].push(cellModel);
    return accumulator;
  }

  function setAlive(atIndices) {
    return new Promise(resolve => {
      const aliveIndices = [ ...atIndices ];
      const deadCellModels = cellMap.filter(cellModel => {
        return !aliveIndices.includes(cellModel.idx);
      });
      deadCellModels.forEach(cellModel => { cellModel.isAlive = 0; });
      aliveIndices.forEach(idx => { cellMap[idx].isAlive = ALIVE; });
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
