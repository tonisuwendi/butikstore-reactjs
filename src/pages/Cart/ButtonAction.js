import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Info from '../../components/UI/Info/Info';
import UIContext from '../../store/UI/ui-context';
import CartContext from '../../store/Cart/cart-context';
import endpoints from '../../lib/endpoints';
import useClientKey from '../../hooks/use-clientkey';
import useHttp from '../../hooks/use-http';

import classes from './Cart.module.css';

const ButtonAction = () => {
  const [updatedHighlighted, setUpdatedHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const uiCtx = useContext(UIContext);
  const clientKey = useClientKey();
  const {
    sendRequest, isLoading, error,
  } = useHttp();
  useEffect(() => {
    if (!updatedHighlighted) {
      return;
    }
    if (!isLoading && error) {
      uiCtx.toggleToaster({
        text: 'Gagal mengupdate keranjang, silakan coba lagi',
        error: true,
      });
      setUpdatedHighlighted(false);
      uiCtx.toggleLoading('');
    }
    if (!isLoading && !error) {
      uiCtx.toggleToaster({
        text: 'Keranjang berhasil diperbarui',
      });
      cartCtx.updateCart();
      setUpdatedHighlighted(false);
      uiCtx.toggleLoading('');
      cartCtx.resetTemporary();
    }
  }, [isLoading, error, updatedHighlighted]);
  const updateCartHandler = () => {
    setUpdatedHighlighted(true);
    uiCtx.toggleLoading('FULLSCREEN');
    sendRequest({
      method: 'PUT',
      url: endpoints.cart(),
      data: {
        clientKey: clientKey.token,
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
