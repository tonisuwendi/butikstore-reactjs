import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import AuthProvider from './store/Auth/AuthProvider';
import UIProvider from './store/UI/UIProvider';
import CartProvider from './store/Cart/CartProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UIProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </UIProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
