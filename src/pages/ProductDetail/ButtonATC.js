import { useContext } from 'react';

import CartContext from '../../store/Cart/cart-context';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import useClientKey from '../../hooks/use-clientkey';
import useToaster from '../../hooks/use-toaster';

import classes from './InfoProduct.module.css';

const ButtonATC = ({ quantity, idProduct }) => {
  const cartCtx = useContext(CartContext);
  const clientKey = useClientKey();
  const {
    sendRequest, error, isLoading,
  } = useHttp();
  const aTCSuccessHandler = () => {
    cartCtx.updateCart();
  };
  const { highlightedHandler } = useToaster({
    isSuccess: !isLoading && !error,
    isFailed: !isLoading && error,
    textSuccess: `${quantity} item successfully added to cart`,
    textFailed: 'Failed to add item to cart, please try again',
    onSuccess: aTCSuccessHandler,
  });
  const addToCartHandler = () => {
    highlightedHandler(true);
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
