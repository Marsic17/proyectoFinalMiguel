import React, { useEffect, useState } from 'react';
import './Admin.css';
import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "../db/firebase";

function Admin() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        id: 0,
        name: "",
        price: 0,
        category: "",
        img: "",
        stock: 0,
        description: "",
    });
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [newProduct, setNewProduct] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "Products"));
            const productsList = querySnapshot.docs.map(doc => doc.data());
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setProduct(prevProduct => ({
            ...prevProduct,
            id: products.length + 1
        }));
    }, [products]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        
        const normalizedProduct = {
            id: product.id.toString(),
            name: product.name,
            price: parseFloat(product.price),
            category: product.category,
            img: product.img,
            stock: parseFloat(product.stock),
            description: product.description,
        }
        
        createProduct(normalizedProduct);
    };

    const createProduct = async (product) => {
        try {
            await addDoc(collection(db, 'Products'), product);
            setNewProduct(product);
            setConfirmationMessage('El producto se ha creado correctamente');
            resetForm();

            // Hide the confirmation message and image after 3 seconds
            setTimeout(() => {
                setConfirmationMessage("");
                setNewProduct(null);
            }, 3000);
        } catch (error) {
            console.error('Error creando el producto: ', error);
        }
    }

    const resetForm = () => {
        setProduct({
            id: products.length + 1,
            name: "",
            price: 0,
            category: "",
            img: "",
            stock: 0,
            description: "",
        });
    }

    return (
        <div className="admin-container">
            <h1>Admin Form</h1>
            {confirmationMessage && (
                <>
                    <p className="confirmation-message">{confirmationMessage}</p>
                    {newProduct && <img src={newProduct.img} alt="product" />}
                </>
            )}
            <form className="admin-form" onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input
                        type="number"
                        name="id"
                        value={product.id}
                        disabled
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Category:
                    <select
                        className="admin-select"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    >
                        <option value="">No selected</option>
                        <option value="pc components">PC Components</option>
                        <option value="laptop">Laptop</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="img"
                        value={product.img}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Stock:
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Admin;