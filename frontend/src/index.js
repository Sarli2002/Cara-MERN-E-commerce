// import React from 'react';
// import './index.css';
// import App from './App';
// import ReactDOM from 'react-dom';
// import ShopContextProvider from "./Context/ShopContext";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ShopContextProvider>
//     <App />
//     </ShopContextProvider>
//   </React.StrictMode>
// );
import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import ShopContextProvider from "./Context/ShopContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </QueryClientProvider>
  // </React.StrictMode>
);
