const fs = require('fs')

const {createPopulation} = require('./Genetics')

const createPopulationExternal = (numCells) => {
    const population = createPopulation(numCells)

    fs.writeFileSync('./files/population.json', JSON.stringify(population, null, 2))
}

module.exports = createPopulationExternal
