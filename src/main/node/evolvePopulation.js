const fs = require('fs')

const Genetics = require('./Genetics')

const evolvePopulation = () => {
    // Read in all cells from file
    const rawData = fs.readFileSync('./files/population.json')
    const population = JSON.parse(rawData)

    const newCells = []

    for (let i=0; i<population.cells.length/2; i++) {
        // randomly obtain 2 cells
        let index1 = Math.floor(Math.random() * population.cells.length)
        const index2 = Math.floor(Math.random() * population.cells.length)

        const cell1 = population.cells[index1]
        const cell2 = population.cells[index2]

        // determine which one is more fit
        const fitterCell = cell1.fitness < cell2.fitness ? cell1 : cell2

        // allow that cell to divide
        const [daughter1, daughter2] = Genetics.divide(fitterCell)

        // put the daughter cells into the population
        newCells.push(daughter1, daughter2)
    }

    // Increment generation value
    population.generation++

    population.cells = newCells.sort((a, b) => a.fitness - b.fitness)

    fs.writeFileSync('./files/population.json', JSON.stringify(population, null, 2))
}

module.exports = evolvePopulation
