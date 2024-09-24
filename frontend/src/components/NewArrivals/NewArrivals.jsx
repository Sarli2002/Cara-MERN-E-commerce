import React, {useState, useEffect, useContext}from 'react'
import { ShopContext } from '../../Context/ShopContext';
import ProductBox from '../ProductBox/ProductBox'
import "./NewArrivals.css"
function NewArrivals() {
  const {products} = useContext(ShopContext);
  const [newarrivals,setNewArrivals] = useState([]);

  useEffect(()=>{
    setNewArrivals(products.slice(0).slice(-8));
  },[products]);



  return (
    <div className='new-arrivals section-p1'>
    <h2>New Arrivals</h2>
    <p> Summer Collection New Modern Design</p>
    <div className="pro-container">
      {newarrivals.map((product,i)=>{
          return <ProductBox key={i} id={product.id} name={product.name} companyName={product.companyName} image={product.image} price={product.price} />
      })}
    </div>
  </div>
  )
}

export default NewArrivals
