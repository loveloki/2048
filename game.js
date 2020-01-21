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
                break;
            case 'ArrowUp':
                this.game.move('up')
                break;
            case 'ArrowLeft':
                this.game.move('left')
                break;
            case 'ArrowRight':
                this.game.move('right')
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
