import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import UIProvider from './store/UI/UIProvider';
import CartProvider from './store/Cart/CartProvider';

ReactDOM.render(
  <React.StrictMode>
    <UIProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </UIProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
