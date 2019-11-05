const v8 = require('v8')

const {createSubFunction} = require('./strategies/neuralStrategy')
const {NUM_ROOMS, MAX_GUESSES} = require('./Game')

const getSubFunctions = (cell) => {
    // Always at least one "root" subFunction
    let subFunctions = [cell]

    for (let x in cell.map) {
        if (typeof cell.map[x] == 'object') {
            // Append all sub functions from the nested sub function (including itself)
            subFunctions = subFunctions.concat(getSubFunctions(cell.map[x]))
        }
    }

    return subFunctions
}

const shouldMutate = () => {
    const rarity = 100

    return Math.floor(Math.random() * rarity) === 0
}

const mutate = (cell) => {
    const index = Math.floor(Math.random() * Object.keys(MUTATIONS).length)
    const mutation = Object.keys(MUTATIONS)[index]
    // console.log('Selected mutation: ' + mutation)

    // Perform the mutation
    MUTATIONS[mutation](cell)
}

const mutateAddOutput = (cell) => {
    // Compile all subFunctions
    const allSubFunctions = getSubFunctions(cell)

    // Select a subFunction from the set
    const selectedSubFunction = allSubFunctions[
        Math.floor(Math.random() * allSubFunctions.length)
    ]

    // Select a random room key under which the output will go
    const roomKey = Math.floor(Math.random() * NUM_ROOMS)

    // Select a random output value
    const outputVal = Math.floor(Math.random() * NUM_ROOMS)

    // Add the output value to the selected subFunction's map
    selectedSubFunction.map[roomKey] = outputVal
}

const mutateAddSubFunction = (cell) => {
    // Compile all subFunctions
    const allSubFunctions = getSubFunctions(cell)

    // Select a subFunction from the set
    const selectedSubFunction = allSubFunctions[
        Math.floor(Math.random() * allSubFunctions.length)
    ]

    // Select a random room key under which the new subFunction will go
    const roomKey = Math.floor(Math.random() * NUM_ROOMS)

    // Select a random lookAtGuess value for the subFunction
    const lookAtGuess = Math.floor(Math.random() * MAX_GUESSES)

    // Create a new subFunction
    const newSubFunction = createSubFunction(lookAtGuess)

    // Add the subFunction to the selected subFunction's map
    selectedSubFunction.map[roomKey] = newSubFunction
}

const mutateRemoveMapping = (cell) => {
    // Compile all subFunctions
    const allSubFunctions = getSubFunctions(cell)

    // Get only subFunctions with removable things
    const filteredSubFunctions = allSubFunctions.filter((val) => {
        return Object.keys(val.map).length !== 0
    })

    if (filteredSubFunctions.length === 0) {
        // No subFunctions have things that can be removed
        return
    }

    // Select a subFunction from the set
    const selectedSubFunction = filteredSubFunctions[
        Math.floor(Math.random() * filteredSubFunctions.length)
    ]

    // Select a random map key from which to remove the output/subFunction
    const keysIndex = Math.floor(Math.random() * Object.keys(selectedSubFunction.map).length)
    const roomIndex = Object.keys(selectedSubFunction.map)[keysIndex]

    // Remove the key from the map
    delete selectedSubFunction.map[roomIndex]
}

const mutateChangeLookAtGuess = (cell) => {
    // Compile all subFunctions
    const allSubFunctions = getSubFunctions(cell)

    // Select a subFunction from the set
    const selectedSubFunction = allSubFunctions[
        Math.floor(Math.random() * allSubFunctions.length)
    ]

    // Select a new lookAtGuess value
    const newLookAtGuess = Math.floor(Math.random() * MAX_GUESSES)

    // Set the subFunction's lookAtGuess to be the new lookAtGuess
    selectedSubFunction.lookAtGuess = newLookAtGuess
}

const mutateChangeDefaultGuess = (cell) => {
    // Compile all subFunctions
    const allSubFunctions = getSubFunctions(cell)

    // Select a subFunction from the set
    const selectedSubFunction = allSubFunctions[
        Math.floor(Math.random() * allSubFunctions.length)
    ]

    // Select a new defaultGuess value
    const newDefaultGuess = Math.floor(Math.random() * NUM_ROOMS)

    // Set the subFunction's lookAtGuess to be the new lookAtGuess
    selectedSubFunction.defaultGuess = newDefaultGuess
}

const MUTATIONS = Object.freeze({
    ADD_OUTPUT: mutateAddOutput,
    ADD_SUB_FUNCTION: mutateAddSubFunction,
    // REMOVE_MAPPING: mutateRemoveMapping,
    CHANGE_LOOK_AT_GUESS: mutateChangeLookAtGuess,
    CHANGE_DEFAULT_GUESS: mutateChangeDefaultGuess
})

const createPopulation = (numCells) => {
    const population = []

    for (let i=0; i< numCells; i++) {
        // Each cell is initialized with a random lookAtGuess in their initial subFunction
        let lookAtGuess = Math.floor(Math.random() * MAX_GUESSES)
        let cell = createSubFunction(lookAtGuess)
        population.push(cell)
    }

    return population
}

/**
 * Divides a cell in two, potentially with mutations.
 */
const divide = (cell) => {
    // Make two clones
    const cell1 = v8.deserialize(v8.serialize(cell))
    const cell2 = v8.deserialize(v8.serialize(cell))

    // check if we should mutate cell1
    if (shouldMutate()) {
        // console.log('\nMutating cell1')
        // console.log('Before:')
        // console.log(JSON.stringify(cell1, null, 2))
        mutate(cell1)
        // console.log('After:')
        // console.log(JSON.stringify(cell1, null, 2))
    }

    // check if we should mutate cell2
    if (shouldMutate()) {
        // console.log('\nMutating cell2')
        // console.log('Before:')
        // console.log(JSON.stringify(cell2, null, 2))
        mutate(cell2)
        // console.log('After:')
        // console.log(JSON.stringify(cell2, null, 2))
    }

    return [cell1, cell2]
}

module.exports = {
    createPopulation,
    divide
}
