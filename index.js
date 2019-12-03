const cells = document.querySelectorAll('.cell')

function getRandomNumber(max) {
    return parseInt(Math.random()*100 % max)
}

var _2048 = {
    chessboard: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    bestScore: 0,
    currentScore: 0,
    prevTile: undefined,
    nextTile: undefined,
    move: function move(direction) {

    },
    merge: function merge() {

    },
    isWin: function isWin() {

    },
    isCanMove: function isCanWin() {

    },
    update: function update() {
        //绘制chessboard
        for (let i = 0; i < chessboard.length; i++) {
            for (let j = 0; j < chessboard.length; j++) {
                const tileLevel = chessboard[i][j]
                const tileSpan = cells[i*4 + j].querySelector('span')

                if (tileLevel != 0) {
                    tileSpan.innerText = 2 ** tileLevel
                    tileSpan.classList.add('tile-' + tileLevel)
                }else{
                    tileSpan.innerText = ''
                }
            }
        }
    },
    newGame: function newGame() {
        //将html所有的className重置为初始值
        for (let i = 0; i < chessboard.length; i++) {
            for (let j = 0; j < chessboard.length; j++) {
                const tileSpan = cells[i*4 + j].querySelector('span')

                tileSpan.className = 'tile'
            }
        }
        //将所有chessboard元素填充为0
        this.chessboard.map( tiles => tiles.fill(0))

        //获取nextTile信息
        const [x, y, level] = this.createNextTile()
        //设置nextTile相关属性
        this.nextTile = [x, y]
        this.chessboard[x][y] = level

        //执行更新
        this.update()
    },
    changeChessboard: function changeChessboard() {

    },
    createNextTile: function createNextTile() {
        var x, y
        do {
            [x, y] = [getRandomNumber(4), getRandomNumber(4)]
        }while(this.chessboard[x][y] != 0)
        var level = getRandomNumber(4)>2 ? 2 : 1

        return [x, y, level]
    },
    updatePrevAndNextTile: function updatePrevAndNextTile() {

    },
    isGameOver: function isGameOver() {

    },
}

