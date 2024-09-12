import React, { useState } from "react";
import "./Shop.css";
import ProductBox from "./../../components/ProductBox/ProductBox";
import { useQuery } from '@tanstack/react-query';

export default function Shop() {
  const [sortCriteria, setSortCriteria] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Correct useQuery usage with object form as argument in React Query v5
  const { data: allproducts = []} = useQuery({
    queryKey: ['allproducts'],
    queryFn: async () => {
      const res = await fetch('https://cara-mern-e-commerce.onrender.com/allproducts');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  });

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const sortProducts = (products) => {
    switch (sortCriteria) {
      case "priceAsc":
        return [...products].sort((a, b) => a.price - b.price);
      case "priceDesc":
        return [...products].sort((a, b) => b.price - a.price);
      case "nameAsc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const filterProducts = (products) => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  };

  const filteredProducts = filterProducts(allproducts);
  const sortedAndFilteredProducts = sortProducts(filteredProducts);

  return (
    <div className="shop">
      <div className="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </div>
      <div className="filter-container section-p1 ">
        <label htmlFor="category">Category: </label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
        <label htmlFor="sort">Sort By: </label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>
      <div className="pro-container section-p1">
        {sortedAndFilteredProducts.map((product, i) => {
          return (
            <ProductBox
              key={i}
              id={product.id}
              name={product.name}
              companyName={product.companyName}
              image={product.image}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
}
