import { NavLink, Link } from "react-router-dom";
import CartWidget from './CartWidget';
import './NavBar.css';
import { CartContext } from './context/CartContext';
import { useContext } from 'react';

const NavBar = () => {
    const {cartCount} = useContext(CartContext)
    return (
        <nav className="NavBar">
            <Link to="/" className="logo">
                <h3>Ecommerce</h3>
            </Link>
            <div className="nav-links">
                <NavLink to={`/category/laptop`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Laptops</NavLink>
                <NavLink to={`/category/pc components`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Componentes de PC</NavLink>
                <NavLink to={`/category/accessories`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Accesorios</NavLink>
                
            </div>
            <div className="cartIcon">
                <NavLink to={`/checkout`}>  <CartWidget /> </NavLink> 
                {cartCount > 0 && <span className="cartNotification">{cartCount}</span>}
            </div>
        </nav>
    );
}

export default NavBar;


