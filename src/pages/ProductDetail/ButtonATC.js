import { useContext, useState, useEffect } from 'react';

import UIContext from '../../store/UI/ui-context';
import CartContext from '../../store/Cart/cart-context';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import useClientKey from '../../hooks/use-clientkey';

import classes from './InfoProduct.module.css';

const ButtonATC = ({ quantity, idProduct }) => {
  const [aTCHighlighted, setATCHighlighted] = useState(false);
  const uiCtx = useContext(UIContext);
  const cartCtx = useContext(CartContext);
  const clientKey = useClientKey();
  const {
    sendRequest, error, isLoading,
  } = useHttp();
  useEffect(() => {
    if (!aTCHighlighted) {
      return;
    }
    if (!isLoading && error) {
      uiCtx.toggleToaster({
        text: 'Gagal memasukkan item ke keranjang, silakan coba lagi',
        error: true,
      });
      setATCHighlighted(false);
    }
    if (!isLoading && !error) {
      uiCtx.toggleToaster({
        text: `${quantity} item berhasil ditambahkan ke keranjang`,
      });
      cartCtx.updateCart();
      setATCHighlighted(false);
    }
  }, [isLoading, error, aTCHighlighted]);
  const addToCartHandler = () => {
    setATCHighlighted(true);
    sendRequest({
      method: 'POST',
      url: endpoints.cart(),
      data: {
        clientKey: clientKey.token,
        productId: idProduct,
        qty: quantity,
      },
    });
  };
  return (
    <button
      type="button"
      className={classes.add_to_cart_button}
      onClick={addToCartHandler}
    >
      {isLoading ? 'Loading...' : 'Add to cart'}
    </button>
  );
};

export default ButtonATC;
