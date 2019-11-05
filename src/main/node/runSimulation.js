const fs = require('fs')

const {Game, NUM_ROOMS, MAX_GUESSES} = require('./Game')

const {neuralStrategy, createSubFunction} = require('./strategies/neuralStrategy')

const runSimulation = (numGames) => {
    // Read in all cells from file
    const rawData = fs.readFileSync('./files/population.json')
    const population = JSON.parse(rawData)

    let cumulativeResults = []

    // For each cell in the population, let it run for a bunch of games
    for (let cell of population) {

        let results = []

        for (let i = 0; i < numGames; i++) {
            let g = new Game()
            while (g.isRunning) {
                g.guessRoom(neuralStrategy(g, cell))
                // g.guessRoom(randomStrategy(g))
            }

            results.push(MAX_GUESSES - g.guesses.length)
        }

        const averageFitness = results.reduce((prev, cur) => (prev + cur)) / results.length
        cell.averageFitness = averageFitness

        cumulativeResults.push(cell)
    }

    cumulativeResults = cumulativeResults.sort((a, b) => b.averageFitness - a.averageFitness)

    // Write out the sorted population to the file
    fs.writeFileSync('./files/population.json', JSON.stringify(cumulativeResults, null, 2))
}

module.exports = runSimulation
