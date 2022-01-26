import { useReducer, useEffect, useCallback } from 'react';

import CartContext from './cart-context';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import useClientKey from '../../hooks/use-clientkey';

const initialState = {
  totalItem: 0,
  items: [],
  subtotal: 0,
  tempItems: [],
};

const cartReducer = (state, action) => {
  if (action.type === 'TEMPORARY') {
    const existingCartItemIndex = state.tempItems.findIndex((item) => item.id === action.data.id);
    const existingCartItem = state.tempItems[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: action.data.quantity,
      };
      updatedItems = [...state.tempItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.tempItems.concat(action.data);
    }
    return {
      ...state,
      tempItems: updatedItems,
    };
  }
  if (action.type === 'UPDATE') {
    return {
      ...state,
      totalItem: action.data.totalItems || 0,
      items: action.data.items || [],
      subtotal: action.data.subtotal || 0,
    };
  }
  if (action.type === 'RESET_TEMP') {
    return {
      ...state,
      tempItems: [],
    };
  }
  return initialState;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const { sendRequest, data: cartData } = useHttp();
  const clientKey = useClientKey();
  const getDataCart = useCallback(() => {
    sendRequest({
      url: endpoints.getCart(clientKey.token),
    });
  }, [sendRequest]);
  useEffect(() => {
    getDataCart();
  }, [getDataCart]);
  useEffect(() => {
    dispatch({ type: 'UPDATE', data: cartData });
  }, [cartData]);
  const updateCartHandler = useCallback(() => {
    getDataCart();
  }, []);
  const updateCartTemporaryHandler = useCallback((data) => {
    dispatch({ type: 'TEMPORARY', data });
  }, []);
  const resetTemporaryHandler = useCallback(() => {
    dispatch({ type: 'RESET_TEMP' });
  }, []);
  const cartContext = {
    totalItem: cartState.totalItem,
    items: cartState.items,
    subtotal: cartState.subtotal,
    tempItems: cartState.tempItems,
    updateCart: updateCartHandler,
    updateCartTemporary: updateCartTemporaryHandler,
    resetTemporary: resetTemporaryHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
