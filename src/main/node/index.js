const createPopulation = require('./createPopulation')
const runSimulation = require('./runSimulation')
const evolvePopulation = require('./evolvePopulation')
const Constants = require('./Constants')

const run = async () => {
    if (process.argv[2] === '--new') {
        // Create the initial population
        console.log('Creating initial population')
        createPopulation(Constants.NUM_CELLS)

        // Run the simulation once on the initial population
        console.log('Running initial simulation')
        await runSimulation()
    }

    // make and run new generations
    for (let i=1; i<Constants.NUM_GENERATIONS; i++) {
        console.log('Run ' + i)

        console.log('Evolving')
        evolvePopulation()

        console.log('Simulating')
        await runSimulation()
    }
}

run()
