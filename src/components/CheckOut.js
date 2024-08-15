import React from 'react';
import { Link } from 'react-router-dom';
import './CheckOut.css';
import { CartContext } from './context/CartContext';
import { useContext } from 'react';
import CheckOutDetail from './checkOutDetail/CheckOutDetail';

const CheckOut = ({ cart = [], clearCart }) => {
  const {setCartCount} = useContext(CartContext)
  const [details, setDetails] = React.useState(1)
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleClearCart = () => {
    setCartCount(0)
    clearCart();

  };
  const handleCheckOut = () => {
    setDetails(2)
  }

  return (
    <>
    {details === 1 ? (
       <div className="checkOut-container">
       <h2>carrito de compras</h2>
       {cart.length === 0 ? (
         <p>no tienes nada en tu carrito.</p>
       ) : (
         <div className="checkOutDetails">
           <ul className="checkOutList">
             {cart.map((product) => (
               
               <li key={product.id} className="checkOutItem">
                 <img src={product.img} alt={product.name} className="checkOutImage" />
                 <div className="checkOutInfo">
                   <h3 className="checkOutName">{product.name}</h3>
                   <p className="checkOutDescription">{product.description}</p>
                   <p className="checkOutPrice">${product.price.toFixed(2)}</p>
                 </div>
               </li>
             ))}
           </ul>
           <div className="checkOutFinal">
             <h3>Total: ${calculateTotal()}</h3>
             <button onClick={handleClearCart} className="clearCartButton">Vaciar carrito</button>
             <button onClick={handleCheckOut} className="checkOutButton">Pagar</button>
           </div>
         </div>
       )}
       <Link to="/" className="home">Inicio</Link>
      
     </div>
      
    )
    :
    <CheckOutDetail cart={cart} clearCart={clearCart} />
    }
    
  
  
   
    </>
  );
};

export default CheckOut;
