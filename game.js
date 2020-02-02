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

    // console.log(...this.game.nextTile);

  },
  showGameOver: function () {
    document.querySelector('.game-message').classList.add('game-over')
  },
  start: function () {
    this.game.init()
    this.game.drawChessboard()
  },
  restart: function () {
    document.querySelector('.game-message').classList.remove('game-over')

    this.game.restart()
    this.game.drawChessboard()
  },
}

export default Game
