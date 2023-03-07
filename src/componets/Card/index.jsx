import React from 'react';
import styles from './Card.module.scss'
import ContentLoader from 'react-content-loader';
import AppContext from '../../context.js';

function Card({ id ,imgUrl, title, onClick, onFavorite, added = false, loading}) {

    const { isItemAdded } = React.useContext(AppContext)
    const {isItemFavorite} = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(false);

    const onClickPlus = () => {
        onClick({ id, parentId: id, imgUrl, title });
    }

    const onClickFavorite = () => {
        isFavorite ? null : onFavorite({ imgUrl, title });
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {loading ?
                <ContentLoader
                    speed={2}
                    width={400}
                    height={200}
                    viewBox="0 0 400 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="0" ry="0" width="110" height="110" />
                    <rect x="-1" y="113" rx="0" ry="0" width="112" height="18" />
                    <rect x="-13" y="136" rx="0" ry="0" width="32" height="32" />
                    <rect x="103" y="144" rx="0" ry="0" width="16" height="16" />
                </ContentLoader> :

                <>
                    <div className={styles.cardContent}>
                        <img width={110} height={110} src={imgUrl}></img>
                        <h5>{title}</h5>
                    </div>
                    <div className={styles.button}>
                        {/* <img id="test" onClick={onClickFavorite} src={isItemFavorite(id) ? "/liked.svg" : "/unliked.svg"}></img> */}
                        <img onClick={onClickPlus} width={15} height={15} src={isItemAdded(id) ? "/check.png" : "/plus.png"}></img>
                    </div>
                </>}

        </div>
    )

}

export default Card