import { useReducer, useEffect, useCallback } from 'react';

import CartContext from './cart-context';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import useClientKey from '../../hooks/use-clientkey';

const initialState = {
  totalItem: 0,
  items: [],
  subtotal: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      ...state,
      totalItem: state.totalItem + action.quantity,
    };
  }
  if (action.type === 'GET') {
    return {
      totalItem: action.data.totalItems || 0,
      items: action.data.items || [],
      subtotal: action.data.subtotal || 0,
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
    dispatch({ type: 'GET', data: cartData });
  }, [cartData]);
  const updateCartHandler = () => {
    getDataCart();
  };
  const cartContext = {
    totalItem: cartState.totalItem,
    items: cartState.items,
    subtotal: cartState.subtotal,
    updateCart: updateCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
