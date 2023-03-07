import React from 'react'
import styles from './Drawer.module.scss'
import AppContext from '../../context'
const Info = ({ onCloseB }) => {

    const { onRemoveItem } = React.useContext(AppContext)

    return (
        <div className={styles.drawerEmpty}>
            <img width={140} height={140} src="/empBox.png"></img>
            <h1>Корзина порожня </h1>
            <button onClick={onCloseB}>Повернутися назад</button>
        </div>
    )
}

export default Info;