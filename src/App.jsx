import './index.scss'
import Card from './componets/Card'
import Header from './componets/Header'
import Drawer from './componets/Drawer'
import React from 'react'
import axios from 'axios'
import AppContext from './context'

// const arr = [{ title: 'Кричуча ворона', img: '/crowa1.png' },
// { title: 'Ітачі ворона', img: '/crowaItachi.jpg' },
// { title: 'Ворона з ножем', img: '/crowaMurder.png' },
// { title: 'Ворон Гоша', img: '/crowaGosha.png' }]


function App() {
  const [items, setItems] = React.useState([])
  const [baskItems, setBaskItems] = React.useState([])
  const [favoriteItems, setFavoriteItems] = React.useState([])
  const [cartOpen, setCartOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [isLoading, setIsLoadind] = React.useState(true)

  React.useEffect(() => { //useEffect Для одного запроса в БД 1.([])
    async function fetchData() {
      try {
        setIsLoadind(true);

        const [itemsRes, BaskRes] = await Promise.all([
          await axios.get('https://63f91d13a4ec283e998277c9.mockapi.io/items?'),
          await axios.get('https://63f91d13a4ec283e998277c9.mockapi.io/card?')
        ]);

        setIsLoadind(false);
        setBaskItems(BaskRes.data);
        setItems(itemsRes.data);

      } catch (error) {
        alert("Помилка! fetchData")
      }

    }
    fetchData()
  }, []) //1.

  const onAddtoCard = async (obj) => {
    console.log(obj);
    try {
      const findItem = baskItems.find((item) => +item.parentId === +obj.id)
      if (findItem) {
        setBaskItems((prev) => prev.filter((item) => +item.parentId !== +obj.id));
        await axios.delete(`https://63f91d13a4ec283e998277c9.mockapi.io/card/${findItem.id}`)
        console.log(baskItems.id, "Дублікат");

      } else {

        setBaskItems(prev => [...prev, obj])
        const { data } = await axios.post('https://63f91d13a4ec283e998277c9.mockapi.io/card?', obj);
        setBaskItems((prev) => prev.map(item => {
          if (item.parentId === obj.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item
        }))
        // console.log(obj, "onAddtoCard");
      }

    } catch (error) {
      console.log("Помилка БД!");
      console.error(error); d
    }

  }
  const onRemoveItem = async (id) => {
    try {
      setBaskItems((prev) => prev.filter((item) => +item.id !== +id));
      await axios.delete(`https://63f91d13a4ec283e998277c9.mockapi.io/card/${id}`);
      console.log(id);
    } catch (error) {
      alert("Помилка при видаленні з БД!")
      console.error(error);
    }
  }
  const onChangetoSearch = (event) => {
    setSearchValue(event.target.value);
  }
  const inputDelete = () => {
    setSearchValue('');
  }
  const isItemAdded = (id) => {
    return baskItems.some((obj) => +obj.parentId === +id)
  }
  const isItemFavorite = (id) => {
    return favoriteItems.some((obj) => +obj.parentId === +id)
  }

  const itemsRender = () => {
    const itemsFilter = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return itemsFilter.map((arr, index) => (
      <Card
        key={index}
        id={arr.id}
        parentId={arr.parentId}
        imgUrl={arr.img}
        title={arr.title}
        onClick={(obj) => onAddtoCard(obj)}
        onFavorite={(obj) => onAddtoFavorites(obj)}
        loading={isLoading} />
    ))
  }

  return (
    <AppContext.Provider value={{ items, baskItems, isItemAdded, onRemoveItem, isItemFavorite }}>
      <div className="wrapper">

        {<Drawer items={baskItems} onClose={() => setCartOpen(false)} onRemove={onRemoveItem} opened={cartOpen} />}

        <Header onClickCart={() => setCartOpen(true)} />

        <div className="content">
          <div className="contentHeader">
            <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : "Список ворон"}</h1>
            <input value={searchValue} onChange={onChangetoSearch} placeholder="Пошук..."></input>
            {searchValue && <img onClick={inputDelete} width={20} height={20} src="./close.png" alt="Clear"></img>}
          </div>

          <div className="card-row">
            {itemsRender()}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
