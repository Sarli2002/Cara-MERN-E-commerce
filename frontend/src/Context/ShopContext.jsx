// import React, { createContext, useEffect, useState  } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { backend_url } from "../App";

// export const ShopContext = createContext(null);

// const ShopContextProvider = (props) => {
//   const [products, setProducts] = useState([]);
// const getDefaultCart = () => {
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };
//   const [cartItems, setCartItems] = useState(getDefaultCart());

//   useEffect(() => {
//     fetch(`${backend_url}/allproducts`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))

//     if (localStorage.getItem("auth-token")) {
//       fetch(`${backend_url}/getcart`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/form-data',
//           'auth-token': `${localStorage.getItem("auth-token")}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(),
//       })
//         .then((resp) => resp.json())
//         .then((data) => { setCartItems(data) });
//     }
//   }, [])

//   const addToCart = (itemId, size, quantity = 1) => {
//     if (!localStorage.getItem("auth-token")) {
//       toast.error("Please login to add products to the cart.", {
//         autoClose: 3000, 
//       });
//       return;
//     }
//     if (!size){
//       toast.error("Please select a size before adding to the cart.", {
//         autoClose: 3000,
//       });
//       return;
//     }

//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: {
//         ...prev[itemId],
//         [size]: (prev[itemId][size] || 0) + quantity,
//       },
//     }));

//     console.log(cartItems);
//     toast.success('Product added to cart!', {
//       autoClose: 2000, 
//     });

//     if (localStorage.getItem("auth-token")) {
//       fetch(`${backend_url}/addtocart`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/form-data',
//           'auth-token': `${localStorage.getItem("auth-token")}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "itemId": itemId }),
//       })
//     }
//   };

//   const removeFromCart = (itemId, size) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: {
//         ...prev[itemId],
//         [size]: Math.max((prev[itemId][size] || 0) - 1, 0),
//       },
//     }));
//     if (localStorage.getItem("auth-token")) {
//       fetch(`${backend_url}/removefromcart`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/form-data',
//           'auth-token': `${localStorage.getItem("auth-token")}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "itemId": itemId }),
//       })
//     }
//   };
  

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       for (const size in cartItems[item]) {
//         if (cartItems[item][size] > 0)
//           try {
//           let itemInfo = products.find((product) => product.id === Number(item));
//           totalAmount += cartItems[item][size] * itemInfo.price;
//         } catch (error) {}
//       }
//     }
//     return totalAmount;
//   };

//   const getTotalCartItems = () => {
//     let totalItem = 0;
//     for (const item in cartItems) {
//       for (const size in cartItems[item]) {
//         if (cartItems[item][size] > 0) 
//           try{
//           totalItem += cartItems[item][size];
//         } catch (error) {}
//       }
//     }
//     return totalItem;
//   };

//   const contextValue = {
//     getTotalCartItems,
//     getTotalCartAmount,
//     products,
//     cartItems,
//     addToCart,
//     removeFromCart,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//       <ToastContainer />
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import React, { createContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // Default cart setup function
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());


  const { data: products = [] } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => fetch(`${backend_url}/allproducts`).then((res) => res.json()),
    refetchOnWindowFocus: false, 
  });

  
  useQuery({
    queryKey: ['cartItems'],
    queryFn: () => {
      if (localStorage.getItem("auth-token")) {
        return fetch(`${backend_url}/getcart`, {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'auth-token': localStorage.getItem("auth-token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        }).then((res) => res.json());
      }
      return getDefaultCart(); // Return default cart if not authenticated
    },
    enabled: !!localStorage.getItem("auth-token"), // Only fetch if authenticated
    onSuccess: (data) => setCartItems(data), // Set cart items on successful fetch
  });

  // Add item to cart logic
  const addToCart = (itemId, size, quantity = 1) => {
    if (!localStorage.getItem("auth-token")) {
      toast.error("Please login to add products to the cart.", { autoClose: 3000 });
      return;
    }
    if (!size) {
      toast.error("Please select a size before adding to the cart.", { autoClose: 3000 });
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [size]: (prev[itemId]?.[size] || 0) + quantity,
      },
    }));

    toast.success('Product added to cart!', { autoClose: 2000 });

    fetch(`${backend_url}/addtocart`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'auth-token': localStorage.getItem("auth-token"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, size, quantity }),
    });
  };

  // Remove item from cart logic
  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [size]: Math.max((prev[itemId]?.[size] || 0) - 1, 0),
      },
    }));

    fetch(`${backend_url}/removefromcart`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'auth-token': localStorage.getItem("auth-token"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, size }),
    });
  };

  // Calculate the total amount in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          const itemInfo = products.find((product) => product.id === Number(item));
          if (itemInfo) {
            totalAmount += cartItems[item][size] * itemInfo.price;
          }
        }
      }
    }
    return totalAmount;
  };

  // Calculate the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          totalItems += cartItems[item][size];
        }
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    products,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      <ToastContainer />
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

