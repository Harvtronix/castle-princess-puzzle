const fs = require('fs')

const Genetics = require('./Genetics')

const mutatePopulation = () => {
    // Read in all cells from file
    const rawData = fs.readFileSync('./files/population.json')
    let population = JSON.parse(rawData)

    // Kill off worst half of population
    population = population.slice(0, population.length/2)

    const newPopulation = []

    // Divide each cell into two new ones
    for (let cell of population) {
        const [cell1, cell2] = Genetics.divide(cell)
        newPopulation.push(cell1, cell2)
    }

    fs.writeFileSync('./files/population.json', JSON.stringify(newPopulation, null, 2))
}

module.exports = mutatePopulation
