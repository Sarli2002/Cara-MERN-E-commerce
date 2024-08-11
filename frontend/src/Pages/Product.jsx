import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';



const Product = () => {
  const {products}= useContext(ShopContext);
  const {productId} = useParams();
  const [product,setProduct] = useState(false);
  useEffect(()=>{
    setProduct(products.find((e)=>e.id === Number(productId)))
  },[products,productId])
  return product ? (
    <div>
     
      <ProductDisplay product={product}/>
      
      
    </div>
  ) : null
}

export default Product
