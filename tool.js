//调试辅助函数

const Tool = {
  showTilesList: function (_2048) {
    //temp
    let showList = []
    for (let i = 0; i < _2048.gridLength; i++) {
      let line = []
      for (let j = 0; j < _2048.gridLength; j++) {
        const level = _2048.chessboard[i][j].level
        line.push(level)
      }
      showList.push(line)
    }
    console.table(showList)
  },
  changeTilesList: function (_2048, positionX, positionY, level) {
    _2048.chessboard[positionX][positionY].level = level
  }
}

export default Tool
