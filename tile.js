var tile = {
    level: 0,
    postion: [0, 0],
    prevPosition: null,
    create: function (level, position) {
        var t = Object.create(tile)
        t.init(level, position)

        return t
    },
    init: function (level, position) {
        this.level = level
        this.position = position
    },
    setLevel: function (level) {
        this.level = level
    },
    setPosition: function (position) {
        this.position = position
    },
    setPrevPosition: function (position) {
        this.prevPosition = position
    },
}

export default tile
