import tile from './tile.js'

function getRandomNumber(max) {
    return parseInt(Math.random()*100 % max)
}

const cells = document.querySelectorAll('.cell')

var _2048 = {
    chessboard: [],
    gridLength: 4,
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
        const go = this.isCanMove(direction)
        //进行一次移动，都移到一边，便于合并操作，然后合并，再移动一次生成最终位置
        if (go) {
            //移动一次
            this.moveTo(direction)

            //合并
            //this.merge(direction)
            //最后移动

        }
    },
    moveTo: function moveTo(direction) {
        //数组名太长，提取成为一个专用函数
        function exchange(a, b) {
            const [i, j, x, y] = [...a, ...b]

            //Q：直接交换会有变量未定义就被使用的问题（bug？）
            return [this.chessboard[i][j], this.chessboard[x][y]] = [this.chessboard[x][y], this.chessboard[i][j]]
        }
        const len = this.gridLength
        //左右移动i不变，上下移动j不变
        if (direction == 'left') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile == 0) {
                        //如果为0，和下一个不是0的tile交换
                        for (let k = j + 1; k < len; k++) {
                            const nextNot0Tile = this.chessboard[i][k]
                            if (nextNot0Tile != 0) {
                                // [this.chessboard[i][j], this.chessboard[i][k]] = [this.chessboard[i][k], this.chessboard[i][j]]
                                exchange.bind(this)([i, j], [i, k])
                                break
                            }
                        }
                    }
                }
            }
        }else if (direction == 'right') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[i][pos - j];
                    if (tile == 0) {
                        //如果为0，和上一个不是0的tile交换
                        for (let k = j + 1; k < len; k++) {
                            const nextNot0Tile = this.chessboard[i][pos - k]
                            if (nextNot0Tile != 0) {
                                // [tile, nextNot0Tile] = [nextNot0Tile, tile]
                                exchange.bind(this)([i, pos - j], [i, pos - k])
                                break
                            }
                        }
                    }
                }
            }
        }else if (direction == 'up') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile == 0) {
                        //如果为0，和下一个不是0的tile交换
                        for (let k = i + 1; k < len; k++) {
                            const nextNot0Tile = this.chessboard[k][j]
                            if (nextNot0Tile != 0) {
                                // [tile, nextNot0Tile] = [nextNot0Tile, tile]
                                exchange.bind(this)([i, j], [k, j])
                                break
                            }
                        }
                    }
                }
            }
        }else if (direction == 'down') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[pos - i][j];
                    if (tile == 0) {
                        //如果为0，和上一个不是0的tile交换
                        for (let k = i + 1; k < len; k++) {
                            const nextNot0Tile = this.chessboard[pos - k][j]
                            if (nextNot0Tile != 0) {
                                // [tile, nextNot0Tile] = [nextNot0Tile, tile]
                                exchange.bind(this)([pos - i, j], [pos - k, j])
                                break
                            }
                        }
                    }
                }
            }
        }
    },
    merge: function merge(direction) {
        const len = this.gridLength
        //左右移动i不变，上下移动j不变
        if (direction == 'left') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile == this.chessboard[i][j + 1]) {
                        this.chessboard[i][j]++
                        this.chessboard[i][j + 1] = 0
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                    if (tile == 0) {
                        //遇到0说明已经合并完毕
                        break
                    }
                }
            }
        }else if (direction == 'right') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[i][pos - j]
                    if (tile == this.chessboard[i][pos - j - 1]) {
                        this.chessboard[i][pos - j]++
                        this.chessboard[i][pos - j - 1] = 0
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                    if (tile == 0) {
                        //遇到0说明已经合并完毕
                        break
                    }
                }
            }
        }else if (direction == 'up') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const tile = this.chessboard[i][j]
                    if (tile == this.chessboard[i + 1][j]) {
                        this.chessboard[i][j]++
                        this.chessboard[i + 1][j] = 0
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                    if (tile == 0) {
                        //遇到0说明已经合并完毕
                        break
                    }
                }
            }
        }else if (direction == 'down') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[pos - i][j];
                    if (tile == this.chessboard[pos - i - 1][j]) {
                        this.chessboard[pos - i][j]++
                        this.chessboard[pos - i - 1][j] = 0
                        //合并完之后下一个是0，需要跳过
                        continue
                    }
                    if (tile == 0) {
                        //遇到0说明已经合并完毕
                        break
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
                    //tile为0，下一个tile不为0
                    if (tile == 0 && this.chessboard[i][j + 1] > 0) {
                        return true
                    }
                    //tile不为0，并且和下一个tile相等
                    if (tile != 0 && tile == this.chessboard[i][j + 1]) {
                        return true
                    }
                }
            }
        }else if(direction == 'right') {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - 1; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[i][pos - j]
                    //tile为0，上一个tile不为0
                    if (tile == 0 && this.chessboard[i][pos - j - 1] > 0) {
                        return true
                    }
                    //tile不为0，并且和上一个tile相等
                    if (tile != 0 && tile == this.chessboard[i][pos - j - 1]) {
                        return true
                    }
                }
            }
        }else if(direction == 'up') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const tile = this.chessboard[i][j]
                    //tile为0，下一个tile不为0
                    if (tile == 0 && this.chessboard[i + 1][j]) {
                        return true
                    }
                    //tile不为0，并且和下一个tile相等
                    if (tile != 0 && tile == this.chessboard[i + 1][j]) {
                        return true
                    }
                }
            }
        }else if(direction == 'down') {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len; j++) {
                    const pos = len - 1
                    const tile = this.chessboard[pos - i][j]
                    //tile为0，上一个tile不为0
                    if (tile == 0 && this.chessboard[pos - i - 1][j]) {
                        return true
                    }
                    //tile不为0，并且和上一个tile相等
                    if (tile != 0 && tile == this.chessboard[pos - i - 1][j]) {
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
            this.chessboard[x][y].level = level
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
        this.chessboard.map(tiles => tiles.map(tile => tile.level = 0))

        //将_2048重置为初始值
        this.nextTile = []
        this.prevTile = undefined
        this.currentScore = 0

        //获取nextTile信息
        for (let i = 0; i < 2; i++) {
            const [x, y, level] = this.createNextTile()
            //设置nextTile相关属性
            this.nextTile.push([x, y])
            this.chessboard[x][y].level = level
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
                if (tile == 0) {
                    return false
                }
                if (i != 0) {
                    if (tile == this.chessboard[i - 1][j]) {
                        return false
                    }
                }
                if (j != 0) {
                    if (tile == this.chessboard[i][j - 1]) {
                        return false
                    }
                }
            }
        }

        return true
    },
}

export default _2048
