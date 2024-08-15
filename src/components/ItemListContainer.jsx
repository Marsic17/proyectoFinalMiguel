import { useState, useEffect, useContext } from "react";
import './ItemListContainer.css';
import { useParams, Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { collection, getDocs } from "firebase/firestore";
import db from "./db/firebase"


const fetchProducts = (category) => {



    return new Promise((resolve) => {
        setTimeout(async () => {
            const fetchData = async () => {
                const querySnapshot = await getDocs(collection(db, 'Products'));
                return querySnapshot.docs.map(doc => doc.data());
            };
            const data = await fetchData();
    
            if (category) {
                resolve(data.filter(product => product.category === category));
            } else {
                resolve(data);
            }
        }, 500);
    });
    };
    
    const ItemListContainer = ({ addToCart }) => {
    const { setCartCount, cartCount } = useContext(CartContext)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        fetchProducts(categoryId).then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, [categoryId]);

    if (loading) {
        return <div className="loading">Espere por favor</div>;
    }


    return (
        <div className="ItemsOnList">
            <h2>Productos</h2>
            <div className="infoBasicProd">

                {products.map(product => (

                    <div key={product.id} className="CardProd">
                        <img src={product.img} alt={product.name} id="ImageProd" />
                        <div className="InfoProd">
                            <h3 className="NameProd">{product.name}</h3>
                            {/* <p className="DescriptionProd">{product.description}</p> */}
                            <p className="PriceProd">${product.price}</p>
                            <div className="ActionsProd">
                                <button onClick={() => { addToCart(product); setCartCount(cartCount + 1) }} className="add-to-cart-button">Añadir al carrito</button>
                                <Link to={`/Item/${product.id}`} className="view-details-button">Descripción</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemListContainer;
