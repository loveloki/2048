const Game = {
  score: 0,
  bestScore: 0,
  game: null,
  init: function (game) {
    this.game = game

    document.querySelector('.new-game').addEventListener('click', event => {
      this.restart()
    })

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case 'ArrowDown':
                this.game.move('down')
                this.update()
                break;
            case 'ArrowUp':
                this.game.move('up')
                this.update()
                break;
            case 'ArrowLeft':
                this.game.move('left')
                this.update()
                break;
            case 'ArrowRight':
                this.game.move('right')
                this.update()
                break;
        }
    })
  },
  update: function () {

  },
  isOver: function () {

  },
  start: function () {
    this.game.start()
  },
  restart: function () {
    this.game.restart()
  },
}

export default Game
