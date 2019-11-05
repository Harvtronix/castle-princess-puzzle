const fs = require('fs')

const createPopulation = require('./createPopulation')
const runSimulation = require('./runSimulation')
const mutatePopulation = require('./mutatePopulation')

const NUM_CELLS = 100000
const NUM_GAMES = 1000
const NUM_GENERATIONS = 30

// Create the initial population
console.log('Creating initial population')
createPopulation(NUM_CELLS)

// Run the simulation once on the initial population
console.log('Running initial simulation')
runSimulation(NUM_GAMES)

// make and run new generations
for (let i=0; i<NUM_GENERATIONS-1; i++) {
    console.log('Mutating generation ' + i)
    mutatePopulation()

    console.log('Running simulation for generation ' + i)
    runSimulation(NUM_GAMES)
}
