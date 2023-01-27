import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/Cart-Context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [isButtonHighlighted,setIsButtonIsHighlighted]=useState(false)
  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const {items}=ctx;
  const btnclasses = `${classes.button} ${isButtonHighlighted? classes.bump:""}`;
  useEffect(() => {
    if(items.length===0){
      return
    }
    setIsButtonIsHighlighted(true);
    const timer=setTimeout(()=>{
      setIsButtonIsHighlighted(false)
    },300)
    return ()=>{
      clearTimeout(timer)
    }
  }, [items]);
  return (
    <button className={btnclasses} onClick={props.showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
