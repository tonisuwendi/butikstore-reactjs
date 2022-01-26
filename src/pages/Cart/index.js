import { useContext, useEffect } from 'react';

import Layout from '../../components/Layout/Default';
import BannerTitle from '../../components/BannerTitle/BannerTitle';
import ProductList from './ProductList';
import CartIsEmpty from './CartIsEmpty';
import CartTotals from './CartTotals';
import ButtonAction from './ButtonAction';
import CartContext from '../../store/Cart/cart-context';

import classes from './Cart.module.css';

const breadcrumbs = [
  {
    id: 'b1',
    url: '/',
    title: 'HOME',
  },
];

const Cart = () => {
  const cartCtx = useContext(CartContext);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      cartCtx.resetTemporary();
    };
  }, []);
  let cartContent;
  if (cartCtx.totalItem > 0) {
    cartContent = (
      <div className={classes.cart}>
        <div className={classes.shoppingCart}>
          <h2 className={classes.title}>Shopping Cart</h2>
          <ProductList />
          <ButtonAction />
        </div>
        <div className={classes.cartTotals}>
          <h2 className={classes.title}>Cart Totals</h2>
          <CartTotals />
          <button className={classes.button_checkout} type="button">Proceed to Checkout</button>
        </div>
      </div>
    );
  } else {
    cartContent = <CartIsEmpty />;
  }
  return (
    <Layout>
      <BannerTitle title="CART" breadcrumb={breadcrumbs} />
      {cartContent}
    </Layout>
  );
};

export default Cart;
