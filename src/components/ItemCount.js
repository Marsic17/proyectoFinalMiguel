import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count > 1 ? count - 1 : 1);

  return (
    <div className="item-count">
      <button onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
};

export default ItemCount;