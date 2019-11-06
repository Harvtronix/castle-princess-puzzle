const fs = require('fs')

const Genetics = require('./Genetics')

const evolvePopulation = () => {
    // Read in all cells from file
    const rawData = fs.readFileSync('./files/population.json')
    const population = JSON.parse(rawData)

    // Kill off worst half of population
    population.cells = population.cells.slice(0, population.cells.length/2)

    const newCells = []

    // Divide each cell into two new ones
    for (let cell of population) {
        const [cell1, cell2] = Genetics.divide(cell)
        newCells.push(cell1, cell2)
    }

    // Increment generation value
    population.generation++

    population.cells = newCells

    fs.writeFileSync('./files/population.json', JSON.stringify(population, null, 2))
}

module.exports = evolvePopulation
