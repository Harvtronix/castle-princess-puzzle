import produce from 'immer'

const DoorActions = Object.freeze({
    CHANGE_DOOR: 'CHANGE_DOOR',
    CHOOSE_DOOR: 'CHOOSE_DOOR',
    RESET: 'RESET'
})

const MAX_ROUNDS = 10

/**
 * Find the door that is currently occupied.
 * @param {boolean[]} doorStates
 */
const getCurrentlyOccupiedDoor = (doorStates) => {

    let currentlyOccupiedDoor = 0
    for (; currentlyOccupiedDoor < doorStates.length; currentlyOccupiedDoor++) {
        if (doorStates[currentlyOccupiedDoor] === true) {
            // we found it
            break;
        }
    }

    return currentlyOccupiedDoor
}

const changeDoor = (state, {log}) => {
    const doorStates = state.doorStates

    // Find the door that is currently occupied
    const currentlyOccupiedDoor = getCurrentlyOccupiedDoor(doorStates)

    // Determine places the princess can move to
    const possibleNewValues = []
    if ((currentlyOccupiedDoor - 1) >= 0) {
        possibleNewValues.push(currentlyOccupiedDoor - 1)
    }
    if ((currentlyOccupiedDoor + 1) < doorStates.length) {
        possibleNewValues.push(currentlyOccupiedDoor + 1)
    }

    // Select a new door based on the possible values
    const newlySelectedDoor = Math.floor(Math.random() * possibleNewValues.length)

    // Set the old door to false and the new door to true
    doorStates[currentlyOccupiedDoor] = false
    doorStates[possibleNewValues[newlySelectedDoor]] = true

    log('PRINCESS: ' + possibleNewValues[newlySelectedDoor])

    return state
}

const chooseDoor = (state, {choice, log}) => {
    state.previousChoices.push(choice)
    log(' LOOKING: ' + choice)

    const currentlyOccupiedDoor = getCurrentlyOccupiedDoor(state.doorStates)

    if (currentlyOccupiedDoor === choice) {
        log('Game ended after ' + state.previousChoices.length + ' guesses')
        state.won = true

        const fitness = MAX_ROUNDS - state.previousChoices.length
        state.fitnessValues.push(fitness)
        printFitnessStates(fitness, state.fitnessValues, log)
    } else if (state.previousChoices.length >= MAX_ROUNDS) {
        log('Max tries exceeded (' + state.previousChoices.length + ')')
        state.won = true
        state.fitnessValues.push(0)
        printFitnessStates(0, state.fitnessValues, log)
    } else {
        state = changeDoor(state, {log})
    }

    return state
}

const printFitnessStates = (cur, arr, log) => {
    const avg = arr.reduce((prev, cur) => (prev + cur)) / arr.length
    log('Fitness: ' + cur)
    log('Average fitness: ' + avg)
}

const reset = (state, {log}) => {
    log('===== NEW GAME =====')

    state.previousChoices = []

    changeDoor(state, {log})

    state.won = false

    return state
}

const doorReducer = produce((draft, action) => {
    switch (action.type) {
        case DoorActions.CHANGE_DOOR:
            return changeDoor(draft, action.payload)
        case DoorActions.CHOOSE_DOOR:
            return chooseDoor(draft, action.payload)
        case DoorActions.RESET:
            return reset(draft, action.payload)
        default:
            return
    }
})

export default doorReducer
export {
    DoorActions
}
