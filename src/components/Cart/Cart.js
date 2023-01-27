import React, { useContext, useState } from "react";
import CartContext from "../../Store/Cart-Context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [orderForm, setOrderForm] = useState(false);
  const [sendingOrderData,setSendingOrderData]=useState(false);
  const [sentOrderData,setSentOrderData]=useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length === 0;
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderFormHandler = () => {
    setOrderForm(true);
  };

  console.log("cart", cartCtx.items);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const ButtonUnderForm = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.removeCartHandler}
      >
        Close
      </button>
      {!hasItems && (
        <button className={classes.button} onClick={orderFormHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler= async(userData)=>{
    setSendingOrderData(true)
      await fetch("https://humna-zubair-default-rtdb.asia-southeast1.firebasedatabase.app/orderlist.json",{
      method:"POST",
      body:JSON.stringify({
        user: userData,
        orderItems:cartCtx.items
      })
     })
     setSendingOrderData(false);
     setSentOrderData(true);
     cartCtx.clearItem();
  }

  const beforeOrderDataSent=(
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderForm && <CheckOut onConfirm={submitOrderHandler} onCancel={props.removeCartHandler} />}
      {!orderForm && ButtonUnderForm}
    </React.Fragment>
  )
    const betweenSendingData=(
      <p>Order is sending...</p>
    )
    const afterOrderSending=(
       <React.Fragment>
        <p>order is sucessfully sent..!</p> 
       <div className={classes.actions}>
      <button
        className={classes.button}
        onClick={props.removeCartHandler}
      >
        Close
      </button>
    </div>
       </React.Fragment>
    )
  return (
    <Modal removeCartHandler={props.removeCartHandler}>
      {!sendingOrderData && !sentOrderData && beforeOrderDataSent}
      {sendingOrderData && betweenSendingData}
      {!sendingOrderData && sentOrderData && afterOrderSending}
    </Modal>
  );
};
export default Cart;
