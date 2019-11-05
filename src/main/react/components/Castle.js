import React from 'react'

import Door from './Door'
import { DoorActions } from '../modules/doorReducer'

const Castle = ({doorStates, lastChosen, dispatch, log, won}) => {
    return (
        <>
            {
                doorStates.map((val, index) => (
                    <Door
                        key={index}
                        id={index}
                        occupied={val}
                        chosen={lastChosen === index}
                        onClick={() => (
                            !won &&
                            dispatch({
                                type: DoorActions.CHOOSE_DOOR,
                                payload: {choice: index, log}
                            })
                        )}
                    />
                ))
            }
        </>
    )
}

export default Castle
