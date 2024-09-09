const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { S3Client } = require('@aws-sdk/client-s3');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const port = process.env.PORT || 4000;
require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


  const s3 = new S3Client({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  });
  
  const upload = multer({
    storage: multer.memoryStorage(), // Use memoryStorage to work with buffers
  });
  
  
  app.post("/upload", upload.single('product'), async (req, res) => {
    console.log("Uploading file");
    const file = req.file;
    console.log("Uploaded file details:", file);
    console.log("req.body", req.body);
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
   

   const params = {
        Bucket: process.env.S3_BUCKET_NAME, // Your bucket name
        Key: `${file.fieldname}_${Date.now()}_${file.originalname}`, // Unique file name
        Body: file.buffer, // The file buffer
        ContentType: file.mimetype, // Set the file type
        ACL: "public-read" // To make the file publicly accessible
   };
   console.log("Uploading file to S3 bucket:", params.Key);
   try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${params.Key}`;
    console.log("Uploaded file URL:", imageUrl);
    res.json({ success: true, image_url: imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: "Error uploading file" });
  }
  });


// MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};



// Schema for creating user model
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});


// Schema for creating Product
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number },
  isFeatured: { type: String, required: true}, 
  date: { type: Date, default: Date.now },
});



// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});


// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      console.log(user.id);
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success, token });
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
  }
})


//Create an endpoint at ip/auth for regestring the user & sending auth-token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, process.env.JWT_SECRET);
  success = true;
  res.json({ success, token })
})


// endpoint for getting all products data
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products");
  res.send(products);
});


// endpoint for getting New Arrivals
app.get("/newarrivals", async (req, res) => {
  try {
    let products = await Product.find({});
    let arr = products.slice(0).slice(-8);
    res.status(200).json(arr); 
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});



//featuredproducts
app.get("/featuredproducts", async (req, res) => {
  try {
    let arr = await Product.find({ isFeatured: "yes" }).limit(8); 
    console.log("Featured Products fetched successfully");
    res.send(arr);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added")
})


// Create an endpoint for removing the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
})


// Create an endpoint for getting cartdata of user
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);

})


// Create an endpoint for adding products using admin panel
app.post("/addproduct", async (req, res) => {
  console.log("Received product data:", req.body); 
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
    isFeatured: req.body.isFeatured,
  });
  console.log("Product to be saved:", product); // Log the product to be saved
  await product.save();
  console.log("Saved product:", product); // Log the saved product
  res.json({ success: true, name: req.body.name })
});


// Create an endpoint for removing products using admin panel
app.post("/removeproduct", async (req, res) => {
  // Find the product to delete
  console.log("Removing product with id:", req.body);
  const product = await Product.findOne({ id: req.body.id });
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  console.log("Product found:", product);
  const imageKey = product.image.split('/').pop();
  console.log("Image key:", imageKey);
  await Product.findOneAndDelete({ id: req.body.id });
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imageKey,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  console.log("Removed");
  res.json({ success: true, name: req.body.name })
});

// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
