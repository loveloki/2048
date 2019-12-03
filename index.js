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

    },
    changeChessboard: function changeChessboard() {

    },
    createNextTile: function createNextTile() {

    },
    updatePrevAndNextTile: function updatePrevAndNextTile() {

    },
    isGameOver: function isGameOver() {

    },
}

