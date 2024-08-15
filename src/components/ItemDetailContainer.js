import React, { useState, useEffect } from 'react';
import './ItemDetailContainer.css';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import db from "./db/firebase"

const fetchProduct = (id) => {
  return new Promise((resolve) => {
    // setTimeout(() => {
    //   const allProducts = [
    //     {id: '1', name: 'b450 pro max', price: 60, category: 'pc components', img: 'https://m.media-amazon.com/images/I/81cgZOTcrPL._AC_SX466_.jpg', stock: 30, description: 'motherboard b450 pro msi' },
    //     {id: '2', name: 'radeon rx6600', price: 200, category: 'pc components', img: 'https://m.media-amazon.com/images/I/81Vtsr0wIVL.__AC_SY300_SX300_QL70_FMwebp_.jpg', stock: 18, description: 'radeon graphics card'},
    //     {id: '3', name: 'amd ryzen 7 5700g', price: 180, category: 'pc components', img: 'https://m.media-amazon.com/images/I/51D3DrDmwkL.__AC_SX300_SY300_QL70_FMwebp_.jpg', stock: 22, description: 'processor amd'},
    //     {id: '4', name: 'Acer Nitro V Laptop', price: 900, category: 'laptop', img: 'https://m.media-amazon.com/images/I/71F-Wcriq4L._AC_SX679_.jpg', stock: 28, description: 'laptop'},
    //     {id: '5', name: 'ASUS TUF Gaming A15', price: 650, category: 'laptop', img: 'https://m.media-amazon.com/images/I/81kxce-AlLL.__AC_SX300_SY300_QL70_FMwebp_.jpg', stock: 12, description: 'laptop'},
    //     {id: '6', name: 'HyperX Cloud II', price: 90, category: 'accessories', img: 'https://m.media-amazon.com/images/I/71u77S3CdSL._AC_SY879_.jpg', stock: 22, description: 'audifonos hyperx'}
    //   ];
    //   resolve(allProducts.find(product => product.id = parseInt(id)));
    //   console.log(allProducts.find(product => product.id = parseInt(id)));
      
    // }, 500);

    setTimeout(async () => {
      const fetchData = async () => {
          const querySnapshot = await getDocs(collection(db, 'Products'));
          return querySnapshot.docs.map(doc => doc.data());
      };
      const data = await fetchData();
      resolve(data.find(product => product.id == parseInt(id)));
     
      
  }, 500);
  });
};

const ItemDetailContainer = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchProduct(itemId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [itemId]);

  if (loading) {
    return <div className="loading">espere por favor</div>;
  }


  return (
    <>
      <h2 style={{marginTop:"60px"}}>Products</h2>
    <div className="ItemsOnList">
      <div className="infoBasicProd">
        {product ? (
          <div key={product.id} className="CardProd">
            <img src={product.img} alt={product.name} className="ImageProd" />
            <div className="InfoProd">
              <h3 className="NameProd">{product.name}</h3>
              <p className="DescriptionProd">{product.description}</p>
              <p className="PriceProd">${product.price}</p>
              <div className="ActionsProd">
                <Link to={`/`} className="view-details-button">volver al inicio</Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
    </>
  );
};

export default ItemDetailContainer;
