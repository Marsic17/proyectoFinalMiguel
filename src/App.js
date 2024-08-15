import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckOut from './components/CheckOut';
import ItemDetailContainer from './components/ItemDetailContainer';
import { useState } from 'react';
import Admin from './components/Admin/Admin';


const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        
        <Router>
            <NavBar cartItems={cart.length} />
            <Routes>
                <Route path='/' element={<ItemListContainer addToCart={addToCart} />} />
                <Route path='/category/:categoryId' element={<ItemListContainer addToCart={addToCart} />} />
                <Route path='/Item/:itemId' element={<ItemDetailContainer addToCart={addToCart} />} />
                <Route path="/checkOut" element={<CheckOut cart={cart} clearCart={clearCart} />} />
                 <Route path="/Admin" element={<Admin cart={cart} clearCart={clearCart}/>} /> 

                <Route path='*' element={<h1>404 not found</h1>} />
            </Routes>
        </Router>
       
    );
};

export default App;

