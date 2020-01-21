import _2048 from './2048.js'
import Game from './game.js'

var game = Object.create(Game)
var game_2048 = Object.create(_2048)

game.init(game_2048)

game.start()
