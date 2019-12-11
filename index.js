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
    nextTile: [],
    move: function move(direction) {
        console.log('move ', direction)
        //判断是否所有方向无法移动: 游戏结束
        const flag = this.isGameOver()
        if (flag) {
            //显示游戏结束画面
            return
        }
        //判断当前方向是否可以移动

        //进行一次移动，都移到一边，便于合并操作，然后合并，再移动一次生成最终位置
        //移动一次
        //合并
        //最后移动

    },
    merge: function merge() {

    },
    isWin: function isWin() {

    },
    isCanMove: function isCanMove(direction) {
        if (direction == 'left' || direction == 'right') {
            for (let i = 0; i < this.chessboard.length; i++) {
                for (let j = 0; j < this.chessboard.length; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile == 0) {
                        return true
                    }
                    if (i != 0 && tile == this.chessboard[i][j - 1]) {
                        return true
                    }
                }
            }
        }else if(direction == 'up' || direction == 'down') {
            for (let i = 0; i < this.chessboard.length; i++) {
                for (let j = 0; j < this.chessboard.length; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile == 0) {
                        return true
                    }
                    if (j != 0 && tile == this.chessboard[i - 1][j]) {
                        return true
                    }
                }
            }
        }else{
            return false
        }
    },
    update: function update() {
        //对nextTile添加相应的className
        this.updateNextTile()
        //绘制chessboard
        for (let i = 0; i < this.chessboard.length; i++) {
            for (let j = 0; j < this.chessboard.length; j++) {
                const tileLevel = this.chessboard[i][j]
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
        for (let i = 0; i < this.chessboard.length; i++) {
            for (let j = 0; j < this.chessboard.length; j++) {
                const tileSpan = cells[i*4 + j].querySelector('span')
                tileSpan.className = 'tile'
            }
        }
        //将_2048重置为初始值
        this.nextTile = []
        this.prevTile = undefined
        this.currentScore = 0

        //将所有chessboard元素填充为0
        this.chessboard.map( tiles => tiles.fill(0))

        //获取nextTile信息
        for (let i = 0; i < 2; i++) {
            const [x, y, level] = this.createNextTile()
            //设置nextTile相关属性
            this.nextTile.push([x, y])
            this.chessboard[x][y] = level
        }

        //执行更新
        requestAnimationFrame( () => {
            requestAnimationFrame( () => {
                this.update()
            })
        })
    },
    changeChessboard: function changeChessboard() {

    },
    updateNextTile: function updateNextTile() {
        this.nextTile.map(([x, y]) => {
            cells[x*4 + y].querySelector('span').classList.add('new-tile')
        })
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
        for (let i = 0; i < this.chessboard.length; i++) {
            for (let j = 0; j < this.chessboard.length; j++) {
                const tile = this.chessboard[i][j]
                if (tile == 0) {
                    return false
                }else if (i != 0 || j != 0) {
                    if (tile == this.chessboard[i][j - 1]) {
                        return false
                    }
                    if (tile == this.chessboard[i - 1][j]) {
                        return false
                    }
                }
            }
        }

        return true
    },
}

document.querySelector('.new-game').addEventListener('click', event => {
    _2048.newGame()
})

document.addEventListener("keydown", event => {
    switch (event.key) {
        case 'ArrowDown':
            _2048.move('down')
            break;
        case 'ArrowUp':
            _2048.move('up')
            break;
        case 'ArrowLeft':
            _2048.move('left')
            break;
        case 'ArrowRight':
            _2048.move('right')
            break;
    }
})

_2048.newGame()
