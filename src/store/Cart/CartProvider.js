import { useCallback, useEffect, useReducer } from 'react';

import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import { generateRandomString } from '../../lib/function';
import CartContext from './cart-context';
import cartReducer, { initialState } from './cartReducer';

const CLIENT_CART_KEY = 'CLIENT_CART_KEY';

const CartProvider = ({ children }) => {
  const keyStorage = localStorage.getItem(CLIENT_CART_KEY);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  const { sendRequest, data: cartData } = useHttp();
  const { clientKey } = cartState;

  const getDataCart = useCallback(() => {
    const token = localStorage.getItem(CLIENT_CART_KEY);
    sendRequest({
      url: endpoints.getCart(token),
    });
  }, [sendRequest]);

  useEffect(() => {
    getDataCart();
  }, [getDataCart]);

  useEffect(() => {
    if (!keyStorage) {
      const randomString = generateRandomString();
      localStorage.setItem(CLIENT_CART_KEY, randomString);
    }
    cartDispatch({
      type: 'SET_CLIENT_KEY',
      clientKey: keyStorage || localStorage.getItem(CLIENT_CART_KEY),
    });
  }, [clientKey]);

  useEffect(() => {
    cartDispatch({ type: 'UPDATE', data: cartData });
  }, [cartData]);

  const updateCartHandler = useCallback(() => {
    getDataCart();
  }, []);

  const updateCartTemporaryHandler = useCallback((data) => {
    cartDispatch({ type: 'TEMPORARY', data });
  }, []);

  const resetTemporaryHandler = useCallback(() => {
    cartDispatch({ type: 'RESET_TEMP' });
  }, []);

  const cartContext = {
    clientKey,
    totalItem: cartState.totalItem,
    items: cartState.items,
    subtotal: cartState.subtotal,
    tempItems: cartState.tempItems,
    updateCart: updateCartHandler,
    updateCartTemporary: updateCartTemporaryHandler,
    resetTemporary: resetTemporaryHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
