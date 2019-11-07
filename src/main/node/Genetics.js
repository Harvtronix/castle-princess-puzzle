const v8 = require('v8')

const Constants = require('./Constants')

const createSubFunction = () => {
    return {
        defaultGuess: 0,
        lookAtGuess: 0,
        map: {},
    }
}

/* Example cell
const cell = {
    defaultGuess: 0,
    lookAtGuess: 0,
    map: {
        0: {
            lookAtGuess: 1,
            map: {
                0: 3,
                1: 2,
                2: 1,
                3: 0
            },
            defaultGuess: 0
        },
        1: 1,
        2: 2,
        3: 3
    }
}
*/

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
    return Math.floor(Math.random() * 100) < Constants.MUTATION_RATE
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
    const roomKey = Math.floor(Math.random() * Constants.NUM_ROOMS)

    // Select a random output value
    const outputVal = Math.floor(Math.random() * Constants.NUM_ROOMS)

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
    const roomKey = Math.floor(Math.random() * Constants.NUM_ROOMS)

    // Create a sunFunction and add it to the selected subFunction's map
    selectedSubFunction.map[roomKey] = createSubFunction()
}

const mutateChangeLookAtGuess = (cell) => {
    // Compile all subFunctions
    const allSubFunctions = getSubFunctions(cell)

    // Select a subFunction from the set
    const selectedSubFunction = allSubFunctions[
        Math.floor(Math.random() * allSubFunctions.length)
    ]

    // Select a new lookAtGuess value
    const newLookAtGuess = Math.floor(Math.random() * Constants.MAX_GUESSES)

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
    const newDefaultGuess = Math.floor(Math.random() * Constants.NUM_ROOMS)

    // Set the subFunction's lookAtGuess to be the new lookAtGuess
    selectedSubFunction.defaultGuess = newDefaultGuess
}

const createCells = (numCells) => {
    const population = []

    for (let i=0; i< numCells; i++) {
        // Each cell is initialized with a "0" as the lookAtGuess in their initial subFunction
        let cell = createSubFunction()
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
        mutate(cell1)
    }

    // check if we should mutate cell2
    if (shouldMutate()) {
        mutate(cell2)
    }

    return [cell1, cell2]
}

const MUTATIONS = Object.freeze({
    ADD_OUTPUT: mutateAddOutput,
    ADD_SUB_FUNCTION: mutateAddSubFunction,
    CHANGE_LOOK_AT_GUESS: mutateChangeLookAtGuess,
    CHANGE_DEFAULT_GUESS: mutateChangeDefaultGuess
})

module.exports = {
    createCells,
    divide
}
