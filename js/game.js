const Game = {
  score: 0,
  bestScore: 0,
  game: null,
  init: function (game) {
    this.game = game

    document.querySelector('.new-game').addEventListener('click', event => {
      this.restart()
    })
    document.querySelector('.try-again').addEventListener('click', event => {
      this.restart()
    })

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case 'ArrowDown':
                this.update('down')
                break;
            case 'ArrowUp':
                this.update('up')
                break;
            case 'ArrowLeft':
                this.update('left')
                break;
            case 'ArrowRight':
                this.update('right')
                break;
        }
    })
  },
  update: function (direction) {
    const isGameOver = this.game.isGameOver()
		if (isGameOver) {
      //显示游戏结束画面
      this.showGameOver()
			return false
		}

    const isCanMove = this.game.isCanMove(direction)
    //如果不能移动
    if (!isCanMove) {
      return
    }

    this.game.move(direction)

    //对nextTile添加相应的className
    this.game.updateNextTile()
    this.game.drawChessboard()

    this.game.save()

    //检测是否合成2048
    const isWin = this.game.isWin()
    if(isWin) {
      this.showWin()
    }
  },
  showGameOver: function () {
    document.querySelector('.game-message').classList.add('game-over')
  },
  showWin: function () {
    document.querySelector('.game-message').classList.add('game-win')

    document.querySelector('.game-message').querySelector('p').innerText = '恭喜获胜'
    document.querySelector('.game-message').querySelector('a').innerText = '再来一局'
  },
  start: function () {
    this.game.init()
    this.game.drawChessboard()
    this.game.changeScore()
  },
  restart: function () {
    document.querySelector('.game-message').className = 'game-message'

    this.game.restart()
    this.game.drawChessboard()
  },
}

export default Game
