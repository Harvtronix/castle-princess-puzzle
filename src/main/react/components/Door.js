import React from 'react'
import classNames from 'classnames'

import styles from './Door.module.scss'

const Door = ({id, occupied, chosen, onClick}) => {
    const doorStyle = classNames(
        styles.door,
        {
            [styles.occupied]: occupied,
            [styles.chosen]: chosen
        }
    )

    return (
        <button className={doorStyle} onClick={onClick}>{id}</button>
    )
}

export default Door
