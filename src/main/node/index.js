const createPopulation = require('./createPopulation')
const runSimulation = require('./runSimulation')
const evolvePopulation = require('./evolvePopulation')

const NUM_CELLS = 100000
const NUM_GAMES = 1000
const NUM_GENERATIONS = 100

// Create the initial population
console.log('Creating initial population')
createPopulation(NUM_CELLS)

// Run the simulation once on the initial population
console.log('Running initial simulation')
runSimulation(NUM_GAMES)

// make and run new generations
for (let i=1; i<NUM_GENERATIONS; i++) {
    console.log('Run ' + i)

    console.log('Evolving')
    evolvePopulation()

    console.log('Simulating')
    runSimulation(NUM_GAMES)
}
