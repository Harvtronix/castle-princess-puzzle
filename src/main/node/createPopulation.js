const fs = require('fs')

const {createCells} = require('./Genetics')

const createPopulation = (numCells) => {
    const cells = createCells(numCells)
    const population = {
        generation: 1,
        cells
    }

    fs.writeFileSync('./files/population.json', JSON.stringify(population, null, 2))
}

module.exports = createPopulation
