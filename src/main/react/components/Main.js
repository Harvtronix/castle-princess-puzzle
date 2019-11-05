import React, { useState, useReducer, useEffect } from 'react'

import doorReducer, { DoorActions } from '../modules/doorReducer'
import logReducer from '../modules/logReducer'

import Castle from './Castle'
import Log from './Log'
import AI from '../modules/AI'

const initialState = {
    previousChoices: [],
    doorStates: [false, false, false, false],
    won: false,
    fitnessValues: []
}

const ROUNDS = 1000
const STEP = 0

// Set up the initially selected door
const initiallySelectedDoor = Math.floor(Math.random() * initialState.doorStates.length)
initialState.doorStates[initiallySelectedDoor] = true

const Main = () => {
    const [guessLog, log] = useReducer(logReducer, ['Princess moves to door ' + initiallySelectedDoor])
    const [doorState, dispatch] = useReducer(doorReducer, initialState)
    const [aiInterval, setAiInterval] = useState(null)

    useEffect(() => {
        if (!doorState.won) {
            const interval = setInterval(
                () => AI.play(doorState, log, dispatch),
                STEP
            )
            setAiInterval(interval)
        } else {
            clearInterval(aiInterval)
            if (doorState.fitnessValues.length < ROUNDS) {
                dispatch({
                    type: DoorActions.RESET,
                    payload: {log}
                })
            }
        }

        return () => {aiInterval && clearInterval(aiInterval)}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doorState.won])

    const castleProps = {
        doorStates: doorState.doorStates,
        lastChosen: doorState.previousChoices[doorState.previousChoices.length - 1],
        dispatch,
        log,
        won: doorState.won
    }

    return (
        <>
            <Castle {...castleProps} />

            {/* <div>
                <button
                    onClick={() => (
                        dispatch({
                            type: DoorActions.RESET,
                            payload: {log}
                        })
                    )}
                >
                    reset
                </button>
            </div> */}

            <Log  log={guessLog} />
        </>
    )
}

export default Main;
