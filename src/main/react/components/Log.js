import React, { useEffect, useRef } from 'react'
import './Log.module.scss'

const Log = ({log}) => {
    const textAreaRef = useRef(null)
    // Scroll to the bottom of the textarea
    useEffect(() => {
        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
    }, [log.length])

    return (
        <div>
            <textarea ref={textAreaRef} value={log.join('\n')} readOnly={true} />
        </div>
    )
}

export default Log
