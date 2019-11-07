const { parentPort } = require('worker_threads')

const Constants = require('./Constants')
const Game = require('./Game')
const neuralStrategy = require('./strategies/neuralStrategy')

// Increase this value to make the sucess percent matter more in the fitness
const SUCCESS_PERCENT_FACTOR = 5

const calculateFitness = (results) => {
    // Fitness: Percentage of time a solution is found combined with the average number of
    // guesses it takes to find a solution
    let numSuccesses = 0
    results.forEach((val) => {
        if (val < Constants.MAX_GUESSES) {
            numSuccesses++
        }
    })
    const successPercent = numSuccesses / results.length

    const averageGuesses = results.reduce((prev, cur) => (prev + cur)) / results.length

    return (Math.pow((1 / successPercent), SUCCESS_PERCENT_FACTOR) * averageGuesses)
}

const runGames = (msg) => {
    const index = msg.index
    const cell = msg.cell
    const results = []

    for (let i = 0; i < Constants.NUM_GAMES; i++) {
        let g = new Game(Constants.NUM_ROOMS, Constants.MAX_GUESSES)
        while (g.isRunning) {
            g.guessRoom(neuralStrategy(g, cell))
        }

        results.push(g.guesses.length)
    }

    const fitness = calculateFitness(results)

    parentPort.postMessage({index, fitness})
}

parentPort.on('message', (msg) => {
    if ('done' in msg) {
        parentPort.postMessage({'done': true})
        process.exit()
    } else {
        runGames(msg)
    }
})
