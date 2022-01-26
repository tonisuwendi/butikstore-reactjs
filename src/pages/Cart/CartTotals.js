import { useContext } from 'react';

import CartContext from '../../store/Cart/cart-context';
import { printFormatPrice } from '../../lib/function';

import classes from './Cart.module.css';

const CartTotals = () => {
  const cartCtx = useContext(CartContext);
  return (
    <div className={classes.cart_total}>
      <div className={classes.cart_total_item}>
        <span>Subtotal</span>
        <strong>{`Rp${printFormatPrice(cartCtx.subtotal)}`}</strong>
      </div>
      <div className={classes.cart_total_item}>
        <span>Shipping</span>
        <strong>Free Shipping - REG: IDR 0</strong>
      </div>
      <div className={classes.cart_total_item}>
        <span>Total</span>
        <strong>{`Rp${printFormatPrice(cartCtx.subtotal)}`}</strong>
      </div>
    </div>
  );
};

export default CartTotals;
