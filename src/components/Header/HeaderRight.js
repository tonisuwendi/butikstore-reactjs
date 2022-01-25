import { useContext, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import Button from '../UI/Button/Button';
import UIContext from '../../store/UI/ui-context';
import CartContext from '../../store/Cart/cart-context';

import classes from './HeaderRight.module.css';

const HeaderRight = memo(() => {
  const uiCtx = useContext(UIContext);
  const cartCtx = useContext(CartContext);
  const history = useHistory();

  const toggleSearchHandler = () => {
    uiCtx.toggleSearch();
  };
  const pushToCart = () => {
    history.push('/cart');
  };

  return (
    <div className={classes.headerright}>
      <Button title="LOGIN / REGISTER" size="sm" />
      <button className={classes.iconMenu} type="button" onClick={toggleSearchHandler}>
        <IoSearchOutline />
      </button>
      <button onClick={pushToCart} className={classes.iconMenu} type="button">
        <IoCartOutline />
        <span className={classes.cartCount}>{cartCtx.totalItem < 10 ? cartCtx.totalItem : '9+'}</span>
      </button>
    </div>
  );
});

export default HeaderRight;
