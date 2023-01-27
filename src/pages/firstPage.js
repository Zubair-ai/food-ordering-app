import { useState } from "react";
import Header from "../components/Layout/Header";
import Meals from "../components/Meals/Meals";
import Cart from "../components/Cart/Cart"
import CartProvider from "../Store/CartProvider"


const FirstPage = () => {
  const [showCart, setShowCart] = useState(false);
  const showCartHandler = () => {
    setShowCart(true);
  };
  const removeCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart removeCartHandler={removeCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <main>
          <Meals />
      </main>
    </CartProvider>
  );
};

export default FirstPage;
