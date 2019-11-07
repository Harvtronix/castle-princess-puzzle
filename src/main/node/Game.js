class Game {
    // History of "rooms" the princess has been in
    rooms = []

    // History of all of the guesses the player has previously made
    guesses = []

    // Whether or not the game is still running
    isRunning = true

    numRooms = 0

    maxGuesses = 0

    constructor(numRooms, maxGuesses) {
        this.numRooms = numRooms
        this.maxGuesses = maxGuesses

        // Set up the princess position
        this.rooms.push(Math.floor(Math.random() * numRooms))
        // console.log('PRINCESS: ' + this.rooms[0])
    }

    guessRoom = (guess) => {
        // console.log('   GUESS: ' + guess + '\n')
        this.guesses.push(guess)

        this._checkDoneCondition()

        if (this.isRunning) {
            this._chooseNewRoom()
        }
    }

    _checkDoneCondition = () => {
        if (this.rooms[this.rooms.length - 1] === this.guesses[this.guesses.length - 1]) {
            this.isRunning = false

            // console.log('Game ended after ' + this.guesses.length + ' guesses')
        }
        else if (this.guesses.length >= this.maxGuesses) {
            this.isRunning = false

            // console.log('Too many guesses (' + this.guesses.length + '). Ending game')
        }
    }

    _chooseNewRoom = () => {
        const lastRoom = this.rooms[this.rooms.length - 1]
        const availableRooms = []

        // Determine available rooms. Can be either one to the left or one to the right
        if (lastRoom + 1 < this.numRooms) {
            availableRooms.push(lastRoom + 1)
        }
        if (lastRoom - 1 >= 0) {
            availableRooms.push(lastRoom - 1)
        }

        const nextRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)]
        this.rooms.push(nextRoom)

        // console.log('PRINCESS: ' + nextRoom)
    }
}

module.exports = Game
