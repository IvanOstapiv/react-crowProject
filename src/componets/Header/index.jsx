import React from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

function Header(props) {

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img width={50} height={50} src="/crow.png" alt="crow" />
        <h3 className="text-uppercase">CrowProject</h3>
      </div>
      <div className={styles.headerRight}>
        {/* <img className={styles.unliked} src="unliked.svg" /> */}
        <img className={styles.basket} onClick={props.onClickCart} width={32} height={32} src="./basket.png" ></img>
        <h3>WokerDoc</h3>
      </div>
    </header>
  )
}

export default Header