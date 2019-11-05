import { DoorActions } from './doorReducer'

const play = (doorState, log, dispatch) => {
    const choice = getChoice(doorState)

    dispatch({
        type: DoorActions.CHOOSE_DOOR,
        payload: {
            choice,
            log
        }
    })
}

const getChoice = (doorState) => {
    // Completely random choice of door
    let choice = Math.floor(Math.random() * doorState.doorStates.length)

    return choice
}

export default {
    play
}
