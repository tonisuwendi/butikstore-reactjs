import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout/Default';
import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Info from '../../components/UI/Info/Info';
import Button from '../../components/UI/Button/Button';
import CartContext from '../../store/Cart/cart-context';
import ProductList from './ProductList';

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
  let cartContent;
  if (cartCtx.totalItem > 0) {
    cartContent = (
      <div className={classes.cart}>
        <div className={classes.shoppingCart}>
          <h2 className={classes.title}>Shopping Cart</h2>
          <ProductList />
        </div>
        <div className={classes.cartTotals}>
          <h2 className={classes.title}>Cart Totals</h2>
        </div>
      </div>
    );
  } else {
    cartContent = (
      <div className={classes.cart_empty}>
        <Info text="Your cart is currently empty." center />
        <Link to="/shop-all">
          <Button title="Return To Shop" size="lg" outline />
        </Link>
      </div>
    );
  }
  return (
    <Layout>
      <BannerTitle title="CART" breadcrumb={breadcrumbs} />
      {cartContent}
    </Layout>
  );
};

export default Cart;
