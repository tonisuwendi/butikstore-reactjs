import { useContext, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import Button from '../UI/Button/Button';
import AuthContext from '../../store/Auth/auth-context';
import UIContext from '../../store/UI/ui-context';
import CartContext from '../../store/Cart/cart-context';

import classes from './HeaderRight.module.css';

const HeaderRight = memo(() => {
  const authCtx = useContext(AuthContext);
  const uiCtx = useContext(UIContext);
  const cartCtx = useContext(CartContext);
  const history = useHistory();

  const toggleSearchHandler = () => {
    uiCtx.toggleSearch();
  };
  const pushToCart = () => {
    history.push('/cart');
  };

  const pushToLogin = () => {
    history.push('/login');
  };

  const pushToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <div className={classes.headerright}>
      {authCtx.isLoggedIn && <Button title="MY ACCOUNT" size="sm" onClick={pushToDashboard} />}
      {!authCtx.isLoggedIn && <Button title="LOGIN / REGISTER" size="sm" onClick={pushToLogin} />}
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
