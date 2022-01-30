import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Info from '../../components/UI/Info/Info';
import UIContext from '../../store/UI/ui-context';
import CartContext from '../../store/Cart/cart-context';
import endpoints from '../../lib/endpoints';
import useHttp from '../../hooks/use-http';
import useToaster from '../../hooks/use-toaster';

import classes from './Cart.module.css';

const ButtonAction = () => {
  const cartCtx = useContext(CartContext);
  const uiCtx = useContext(UIContext);
  const {
    sendRequest, isLoading, error,
  } = useHttp();
  const successHandler = () => {
    uiCtx.toggleLoading('');
    cartCtx.updateCart();
    cartCtx.resetTemporary();
  };
  const failedHandler = () => {
    uiCtx.toggleLoading('');
  };
  const { highlightedHandler } = useToaster({
    isSuccess: !isLoading && !error,
    isFailed: !isLoading && error,
    textSuccess: 'Cart updated successfully',
    textFailed: 'Cart update failed, please try again',
    onSuccess: successHandler,
    onFailed: failedHandler,
  });
  const updateCartHandler = () => {
    highlightedHandler(true);
    uiCtx.toggleLoading('FULLSCREEN');
    sendRequest({
      method: 'PUT',
      url: endpoints.cart(),
      data: {
        clientKey: cartCtx.clientKey,
        data: cartCtx.tempItems,
      },
    });
  };
  let warningCartIsUpdated;
  let buttonUpdateClasses = '';
  if (cartCtx.tempItems.length > 0) {
    warningCartIsUpdated = <Info warning center small text="Need to Update Cart because cart has changed!" />;
    buttonUpdateClasses = classes.button_update_cart_active;
  }
  return (
    <>
      {warningCartIsUpdated}
      <div className={classes.button_action}>
        <Link to="/shop-all">
          <button type="button">Continue Shopping</button>
        </Link>
        <button
          onClick={updateCartHandler}
          className={buttonUpdateClasses}
          type="button"
        >
          Update Cart
        </button>
      </div>
    </>
  );
};

export default ButtonAction;
