import { createContext } from 'react';

const CartContext = createContext({
  totalItem: 0,
  items: [],
  subtotal: 0,
  tempItems: [],
  updateCart: () => {},
  updateCartTemporary: () => {},
  resetTemporary: () => {},
});

export default CartContext;
