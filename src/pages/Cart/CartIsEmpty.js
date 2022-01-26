import { Link } from 'react-router-dom';
import Info from '../../components/UI/Info/Info';
import Button from '../../components/UI/Button/Button';

import classes from './Cart.module.css';

const CartIsEmpty = () => (
  <div className={classes.cart_empty}>
    <Info text="Your cart is currently empty." center />
    <Link to="/shop-all">
      <Button title="Return To Shop" size="lg" outline />
    </Link>
  </div>
);

export default CartIsEmpty;
