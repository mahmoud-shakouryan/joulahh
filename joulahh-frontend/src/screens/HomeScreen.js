import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  
  const [products, setProducts] = useState([]);
  
  const fetchData = async () => {
    const {data} =  await axios.get('/api/products');
    setProducts(data);
  }
  useEffect(() => {
   fetchData();
  }, [])
   
  return (
        <div>
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}/>
            ))}
          </div>
        </div>
    )
}

export default HomeScreen
