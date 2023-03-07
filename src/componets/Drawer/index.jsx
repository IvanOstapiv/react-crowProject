import Info from './Info'
import styles from './Drawer.module.scss'

function Drawer({ onClose, items = [], onRemove, opened }) {
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <div className={styles.drawHeader}>
                    <h1>Корзина</h1>
                    <img onClick={onClose} width={32} height={32} src="./close.png"></img>
                </div>
                {
                    items.length > 0 ? <div>
                        {items.map((obj) => (
                            <div key={obj.id} className={styles.drawItem}>
                                <img onClick={() => { onRemove(obj.id) }} width={60} height={60} src={obj.imgUrl}></img>
                                <h5>{obj.title}</h5>

                            </div>
                        ))}
                    </div>

                        :

                        <Info onCloseB={onClose}/>
                }
            </div>
        </div>
    )
}

export default Drawer