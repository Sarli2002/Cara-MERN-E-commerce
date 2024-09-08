import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    price: "",
    isFeatured: "yes",
  });

  const AddProduct = async () => {
    console.log("Product Details before sending:", productDetails); 
    
    let dataObj;
    let product = productDetails;
    console.log("Product before sending:", product); 
    if (!image) {
      alert("Please select an image before adding the product.");
      return;
    }

    let formData = new FormData();
    formData.append("product", image);
   

    await fetch(`${backend_url}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json())
      .then((data) => {dataObj = data });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      console.log("Product after upload:", product); 
      console.log("Product Details after upload:", productDetails); 
      await fetch(`${backend_url}/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => { 
          console.log("Product  after sending:", product); 
          data.success ? alert("Product Added") : alert("Failed to add product") });

    }
    else {
      console.error("Failed to upload image to S3:", dataObj.error);
      alert("Failed to upload image to S3");
    }

  }
  

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  }


  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input type="text" name="description" value={productDetails.description} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="price" value={productDetails.price} onChange={changeHandler} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Featured Product</p>
        <select value={productDetails.isFeatured} name="isFeatured" className="add-product-selector" onChange={changeHandler}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" accept="image/*" hidden />
      </div>
      
      <button className="addproduct-btn" onClick={AddProduct}>ADD</button>
    </div>
  );
};

export default AddProduct;
