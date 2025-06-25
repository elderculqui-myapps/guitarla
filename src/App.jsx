import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { useEffect, useState } from "react"
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCard(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) {
        return;
      }
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updateCart = cart.map(guitar => {
    if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        guitar.quantity++;
      }
      return guitar;
    });
    setCart(updateCart);
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        guitar.quantity--;
      }
      return guitar;
    });
    setCart(updateCart);
  }

  function cleanCart() {
    setCart([]);
  }

  return (
    <>
      <Header 
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />
      
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección de Guitarras</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar 
                key={guitar.id} 
                guitar={guitar} 
                addToCard={addToCard}
              />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados R</p>
        </div>
    </footer>
    </>
  )
}

export default App
