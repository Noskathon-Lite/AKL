import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductProvider from './contexts/ProductContext';
import SidebarProvider from './contexts/SidebarContext';
import CartProvider from './contexts/CartContext';
import UserSidebarProvider from './contexts/UserSidebarContext';
import UserProvider, { UserContext } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>

  <UserSidebarProvider>
  <SidebarProvider>
  <CartProvider>
  <ProductProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ProductProvider>
  </CartProvider>
  </SidebarProvider>
  </UserSidebarProvider>
  </UserProvider>
);
