var tile = {
    level: 0,
    position: [0, 0],
    isNew: false,
    isMerged: false,
    startPosition: null,
    endPosition: null,
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
    setStartPosition: function (position) {
        this.startPosition = position
    },
    setEndPosition: function (position) {
        this.endPosition = position
    },
}

export default tile
