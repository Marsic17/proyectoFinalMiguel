import React, { useState } from 'react';
import './CheckOutDetail.css';
import { collection, addDoc } from 'firebase/firestore';
import db from "../db/firebase";
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function CheckOutDetail({ cart, clearCart }) {
    const { setCartCount } = useContext(CartContext);

    const handleClearCart = () => {
        setCartCount(0);
        clearCart();
    };

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);

    const createOrder = async (name, phone, email) => {
        if (cart.length === 0) {
            setError('El carrito está vacío. No se puede generar la orden.');
            return;
        }

        const order = {
            buyer: {
                name: name,
                phone: phone,
                email: email
            },
            items: cart,
            date: new Date().toISOString()
        };

        setLoading(true);
        setError(null);

        try {
            const orderRef = await addDoc(collection(db, 'orders'), order);
            setOrderId(orderRef.id);
            handleClearCart();
        } catch (error) {
            console.error('Error creating order: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createOrder(formData.name, formData.phone, formData.email);
    };

    return (
        <div className="checkout-container">
            {loading ? (
                <p>Generando orden...</p>
            ) : orderId ? (
                <>
                    <div className='container'>
                        <p>Orden creada con ID: {orderId}</p>
                        <Link to="/" className="home">Volver al Inicio</Link>
                    </div>
                </>
            ) : (
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>CheckOut Detail</h2>
                    {error && <p className="error">{error}</p>}
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Teléfono:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Correo:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>

            )}
        </div>
    );
}

export default CheckOutDetail;
