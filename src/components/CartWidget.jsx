import React from 'react';
import cart from './cart.png';
import './cartWidget.css';


const CartWidget = () => {


  return (
    <div className="cart-widget">
      <img src={cart} alt="Carrito" className="cartIcon" />
    </div>
  );
};

export default CartWidget;