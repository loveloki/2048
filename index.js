import _2048 from './2048.js'

var game = Object.create(_2048)

document.querySelector('.new-game').addEventListener('click', event => {
    game.restart()
})

document.addEventListener("keydown", event => {
    switch (event.key) {
        case 'ArrowDown':
            game.move('down')
            break;
        case 'ArrowUp':
            game.move('up')
            break;
        case 'ArrowLeft':
            game.move('left')
            break;
        case 'ArrowRight':
            game.move('right')
            break;
    }
})

game.start()
