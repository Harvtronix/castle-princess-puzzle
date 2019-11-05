const {NUM_ROOMS} = require('../Game')

const randomStrategy = (game) => {
    const numRooms = NUM_ROOMS

    return Math.floor(Math.random() * numRooms)
}

module.exports = randomStrategy
