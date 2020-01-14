import tile from './tile.js'

function getRandomNumber(max) {
    return parseInt(Math.random()*100 % max)
}

const cells = document.querySelectorAll('.cell')

var _2048 = {
    tool: {
    showTilesList: function() {
        //temp
        let showList = []
        for (let i = 0; i < this.gridLength; i++) {
            let line = []
            for (let j = 0; j < this.gridLength; j++) {
                const level = this.chessboard[i][j].level
                line.push(level)
            }
            showList.push(line)
        }
        console.table(showList)
    },
    },
    chessboard: [],
    gridLength: 4,
    bestScore: 0,
    currentScore: 0,
    prevTile: undefined,
    nextTile: [],
    move: function move(direction) {
        //判断是否所有方向无法移动: 游戏结束
        const flag = this.isGameOver()
        if (flag) {
            //显示游戏结束画面
            return
        }
        //判断当前方向是否可以移动
        const go = this.isCanMove(direction)
        //进行一次移动，都移到一边，便于合并操作，然后合并，再移动一次生成最终位置
        if (go) {
            //每次移动要更新tile的position
            //prevPosition存储最初的position
            //position每次移动都需要改变， -> 和实际界面对应，避免不知道的bug出现


            //移动一次
            this.moveTo(direction)
            //合并
            this.merge(direction)
            //最后移动
            this.moveTo(direction)

            //执行tile移动动画

            //生成下一个（新的）tile
            const [x, y, level] = this.createNextTile()
            //移除之前的nextTile值
            this.nextTile = []
            //设置nextTile相关属性
            this.nextTile.push([x, y])
            this.chessboard[x][y].setLevel(level)
            //更新界面
            this.update()
        }
    },
    moveTo: function moveTo(direction) {
        const len = this.gridLength

        //移动位置
        if (direction == 'left') {
            for (let i = 0; i < len; i++) {
                const notZero = []
                const zero = []
                for (let j = 0; j < len; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile.level == 0) {
                        zero.push(tile)
                    }else{
                        notZero.push(tile)
                    }
                }
                this.chessboard[i] = [...notZero, ...zero]
            }
        }else if (direction == 'right') {
            for (let i = 0; i < len; i++) {
                const notZero = []
                const zero = []
                for (let j = 0; j < len; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile.level == 0) {
                        zero.push(tile)
                    }else{
                        notZero.push(tile)
                    }
                }
                this.chessboard[i] = [...zero, ...notZero]
            }
        }else if (direction == 'up') {
            for (let j = 0; j < len; j++) {
                const notZero = []
                const zero = []
                for (let i = 0; i < len; i++) {
                    const tile = this.chessboard[i][j]
                    if (tile.level == 0) {
                        zero.push(tile)
                    }else{
                        notZero.push(tile)
                    }
                }
                const row = [...notZero, ...zero]

                for (let i = 0; i < len; i++) {
                    this.chessboard[i][j] = row[i]
                }
            }
        }else if (direction == 'down') {
            for (let j = 0; j < len; j++) {
                const notZero = []
                const zero = []
                for (let i = 0; i < len; i++) {
                    const tile = this.chessboard[i][j]
                    if (tile.level == 0) {
                        zero.push(tile)
                    }else{
                        notZero.push(tile)
                    }
                }
                const row = [...zero, ...notZero]

                for (let i = 0; i < len; i++) {
                    this.chessboard[i][j] = row[i]
                }
            }
        }

        //更新新的（移动后的）位置信息
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                const tile = this.chessboard[i][j]
                if (tile.startPosition == null && tile.level != 0) {
                    let [x, y] = tile.position
                    tile.setStartPosition([x, y])
                    tile.setEndPosition([i, j])
                }
                tile.setPosition([i, j])
            }
        }
    },
    merge: function merge(direction) {
        const len = this.gridLength

        //level被设置为0的tile需要更新的终点位置信息 -> 完成动画
        //level被设置为0的tile的终点就是merge的元素的终点
        if (direction == 'left') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile.level != 0 && (tile.level == this.chessboard[i][j + 1].level)) {
                        this.chessboard[i][j].setLevel(tile.level + 1)
                        cells[i*4 + j].querySelector('span').classList.add('merge')
                        this.chessboard[i][j + 1].setLevel(0)
                        //更新level被设置为0的tile的动画终点
                        this.chessboard[i][j + 1].setEndPosition(this.chessboard[i][j].endPosition)
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                }
            }
        }else if (direction == 'right') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[i][pos - j]
                    if (tile.level != 0 && (tile.level == this.chessboard[i][pos - j - 1].level)) {
                        this.chessboard[i][pos - j].setLevel(tile.level + 1)
                        cells[i*4 + pos - j].querySelector('span').classList.add('merge')
                        this.chessboard[i][pos - j - 1].setLevel(0)
                        //更新level被设置为0的tile的动画终点
                        this.chessboard[i][pos - j - 1].setEndPosition(this.chessboard[i][pos - j].endPosition)
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                }
            }
        }else if (direction == 'up') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile.level != 0 && (tile.level == this.chessboard[i + 1][j].level)) {
                        this.chessboard[i][j].setLevel(tile.level + 1)
                        cells[i*4 + j].querySelector('span').classList.add('merge')
                        this.chessboard[i + 1][j].setLevel(0)
                        //更新level被设置为0的tile的动画终点
                        this.chessboard[i + 1][j].setEndPosition(this.chessboard[i][j].endPosition)
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                }
            }
        }else if (direction == 'down') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[pos - i][j];
                    if (tile.level != 0 && (tile.level == this.chessboard[pos - i - 1][j].level)) {
                        this.chessboard[pos - i][j].setLevel(tile.level + 1)
                        cells[(pos - i)*4 + j].querySelector('span').classList.add('merge')
                        this.chessboard[pos - i - 1][j].setLevel(0)
                        //更新level被设置为0的tile的动画终点
                        this.chessboard[pos - i - 1][j].setEndPosition(this.chessboard[pos - i][j].endPosition)
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                }
            }
        }
    },
    isWin: function isWin() {

    },
    isCanMove: function isCanMove(direction) {
        const len = this.gridLength

        if (direction == 'left') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const tile = this.chessboard[i][j]
                    //level为0，下一个level不为0
                    if (tile.level == 0 && this.chessboard[i][j + 1].level > 0) {
                        return true
                    }
                    //level不为0，并且和下一个level相等
                    if (tile.level != 0 && tile.level == this.chessboard[i][j + 1].level) {
                        return true
                    }
                }
            }
        }else if(direction == 'right') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[i][pos - j]
                    //level为0，上一个level不为0
                    if (tile.level == 0 && this.chessboard[i][pos - j - 1].level > 0) {
                        return true
                    }
                    //level不为0，并且和上一个level相等
                    if (tile.level != 0 && tile.level == this.chessboard[i][pos - j - 1].level) {
                        return true
                    }
                }
            }
        }else if(direction == 'up') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const tile = this.chessboard[i][j]
                    //level为0，下一个level不为0
                    if (tile.level == 0 && this.chessboard[i + 1][j].level) {
                        return true
                    }
                    //level不为0，并且和下一个level相等
                    if (tile.level != 0 && tile.level == this.chessboard[i + 1][j].level) {
                        return true
                    }
                }
            }
        }else if(direction == 'down') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[pos - i][j]
                    //level为0，上一个level不为0
                    if (tile.level == 0 && this.chessboard[pos - i - 1][j].level) {
                        return true
                    }
                    //level不为0，并且和上一个level相等
                    if (tile.level != 0 && tile.level == this.chessboard[pos - i - 1][j].level) {
                        return true
                    }
                }
            }
        }

        return false
    },
    update: function update() {
        //对nextTile添加相应的className
        this.updateNextTile()
        //绘制chessboard
        for (let i = 0; i < this.gridLength; i++) {
            for (let j = 0; j < this.gridLength; j++) {
                const tileLevel = this.chessboard[i][j].level
                const tileSpan = cells[i*4 + j].querySelector('span')

                if (tileLevel != 0) {
                    tileSpan.innerText = 2 ** tileLevel
                    tileSpan.classList.add('tile-' + tileLevel)
                }else{
                    tileSpan.className = 'tile'
                    tileSpan.innerText = ''
                }
            }
        }
    },
    start: function start() {
        //初始化tile
        for (let i = 0; i < this.gridLength; i++) {
            let line = []
            for (let j = 0; j < this.gridLength; j++) {
                let t = tile.create(0, [i, j])
                line.push(t)
            }
            this.chessboard.push(line)
        }

        //获取nextTile信息
        for (let i = 0; i < 2; i++) {
            const [x, y, level] = this.createNextTile()
            //设置nextTile相关属性
            this.nextTile.push([x, y])
            this.chessboard[x][y].setLevel(level)
        }

        //执行更新
        this.update()
    },
    restart: function restart() {
        //将html所有的className重置为初始值
        for (let i = 0; i < this.gridLength; i++) {
            for (let j = 0; j < this.gridLength; j++) {
                const tileSpan = cells[i*4 + j].querySelector('span')
                tileSpan.className = 'tile'
            }
        }
        //将所有chessboard元素填充为0
        this.chessboard.map(tiles => tiles.map(tile => tile.setLevel(0)))

        //将_2048重置为初始值
        this.nextTile = []
        this.prevTile = undefined
        this.currentScore = 0

        //获取nextTile信息
        for (let i = 0; i < 2; i++) {
            const [x, y, level] = this.createNextTile()
            //设置nextTile相关属性
            this.nextTile.push([x, y])
            this.chessboard[x][y].setLevel(level)
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
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
        }while(this.chessboard[x][y].level != 0)
        var level = getRandomNumber(4)>2 ? 2 : 1

        return [x, y, level]
    },
    updatePrevAndNextTile: function updatePrevAndNextTile() {

    },
    isGameOver: function isGameOver() {
        for (let i = 0; i < this.gridLength; i++) {
            for (let j = 0; j < this.gridLength; j++) {
                const tile = this.chessboard[i][j]
                if (tile.level == 0) {
                    return false
                }
                if (i != 0) {
                    if (tile.level == this.chessboard[i - 1][j].level) {
                        return false
                    }
                }
                if (j != 0) {
                    if (tile.level == this.chessboard[i][j - 1].level) {
                        return false
                    }
                }
            }
        }

        return true
    },
}

export default _2048
