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
        <div className={doorStyle} onClick={onClick}>{id}</div>
    )
}

export default Door
