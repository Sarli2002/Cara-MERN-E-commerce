import React, { useEffect } from 'react';
import ProductBox from '../ProductBox/ProductBox';
import "./FeaturedProducts.css";

function FeaturedProducts({ data }) {
  useEffect(() => {
  }, [data]);

  // Filter only featured products
  const featuredProducts = data.filter(product => product.isFeatured);

  return (
    <div className='featuredProducts section-p1'>
      <h2>Featured Products</h2>
      <p>Summer Collection New Modern Design</p>
      <div className="pro-container">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product, i) => (
            <ProductBox
              key={i}
              id={product.id}
              name={product.name}
              companyName={product.companyName}
              image={product.image}
              price={product.price}
            />
          ))
        ) : (
          <p>No featured products available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default FeaturedProducts;
