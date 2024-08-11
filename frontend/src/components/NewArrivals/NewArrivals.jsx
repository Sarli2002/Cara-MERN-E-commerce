import React from 'react'

import ProductBox from '../ProductBox/ProductBox'
import "./NewArrivals.css"
function NewArrivals(props) {
  return (
    <div className='new-arrivals section-p1'>
    <h2>New Arrivals</h2>
    <p> Summer Collection New Modern Design</p>
    <div className="pro-container">
      {props.data.map((product,i)=>{
          return <ProductBox key={i} id={product.id} name={product.name} companyName={product.companyName} image={product.image} price={product.price} />
      })}
    </div>
  </div>
  )
}

export default NewArrivals
