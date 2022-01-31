import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout/Default';
import BannerTitle from '../../components/BannerTitle/BannerTitle';
import ProductList from '../../components/Cart/ProductList';
import CartIsEmpty from './CartIsEmpty';
import CartTotals from '../../components/Cart/CartTotals';
import ButtonAction from './ButtonAction';
import CartContext from '../../store/Cart/cart-context';
import UIContext from '../../store/UI/ui-context';
import { breadcrumbs } from '../../data/banner';

import classes from './Cart.module.css';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const uiCtx = useContext(UIContext);
  useEffect(() => () => {
    cartCtx.resetTemporary();
    uiCtx.toggleToaster(null);
  }, []);
  let cartContent;
  if (cartCtx.totalItem > 0) {
    cartContent = (
      <div className={classes.cart}>
        <div className={classes.shoppingCart}>
          <h2 className={classes.title}>Shopping Cart</h2>
          <ProductList withAction products={cartCtx.items} />
          <ButtonAction />
        </div>
        <div className={classes.cartTotals}>
          <h2 className={classes.title}>Cart Totals</h2>
          <CartTotals />
          <Link to="/checkout">
            <button className={classes.button_checkout} type="button">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    );
  } else {
    cartContent = <CartIsEmpty />;
  }
  return (
    <Layout title="Cart">
      <BannerTitle title="CART" breadcrumb={breadcrumbs} />
      {cartContent}
    </Layout>
  );
};

export default Cart;
