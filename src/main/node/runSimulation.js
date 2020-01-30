const fs = require('fs')
const { Worker } = require('worker_threads')

const Constants = require('./Constants')

const runWorker = (worker, index, cell) => {
    worker.postMessage({
        index,
        cell
    })
}

const runSimulation = async () => {
    // Read in all cells from file
    const rawData = fs.readFileSync('./files/population.json')
    const population = JSON.parse(rawData)
    const workerPool = []
    const promises = []

    // Create a pool of workers
    for (let i=0; i<Constants.NUM_WORKERS; i++) {
        const worker = new Worker('./runGames.js')
        const workerPromise = new Promise((resolve, reject) => {
            worker.on('message', (data) => {
                if ('done' in data) {
                    resolve(data)
                } else {
                    population.cells[data.index] = {
                        ...population.cells[data.index],
                        ...data
                    }
                    delete population.cells[data.index].index // index is irrelevant in result data
                }
            })
        })

        workerPool.push(worker)
        promises.push(workerPromise)
    }

    // For each cell in the population, let it run for a bunch of games on a worker
    let currentWorker = 0
    for (let i=0; i<population.cells.length; i++) {
        runWorker(workerPool[currentWorker], i, population.cells[i])

        currentWorker++
        currentWorker %= Constants.NUM_WORKERS
    }

    // Send a done message to each worker
    for (let worker of workerPool) {
        worker.postMessage({'done': true})
    }

    await Promise.all(promises)

    population.cells = population.cells.sort((a, b) => b.fitness - a.fitness)

    // Write out the sorted population to the file
    fs.writeFileSync('./files/population.json', JSON.stringify(population, null, 2))

    // Write out duplicate version always showing last simulation results
    fs.writeFileSync('./files/last-results.json', JSON.stringify(population, null, 2))
}

module.exports = runSimulation
