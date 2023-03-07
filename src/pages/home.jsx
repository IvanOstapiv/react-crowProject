import Card from '../componets/Card'

function Home() {

    return (
    <div className="content">
        <div className="contentHeader">
            <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : "Список ворон"}</h1>
            <input value={searchValue} onChange={onChangetoSearch} placeholder="Пошук..."></input>
            {searchValue && <img onClick={inputDelete} width={20} height={20} src="./close.png" alt="Clear"></img>}
        </div>

        <div className="card-row">
            {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((arr, index) => (
                <Card
                    key={index}
                    title={arr.title}
                    imgUrl={arr.img}
                    onClick={(obj) => onAddtoCard(obj)}
                    onFavorite={(obj) => onAddtoFavorites(obj)} />
            ))}
        </div>
    </div>
    )
}

export default Home;