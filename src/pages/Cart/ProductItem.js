import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import QuantityAction from '../../components/QuantityAction/QuantityAction';
import CartContext from '../../store/Cart/cart-context';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import useClientKey from '../../hooks/use-clientkey';
import useToaster from '../../hooks/use-toaster';
import { printFormatPrice } from '../../lib/function';

import classes from './ProductItem.module.css';

const ProductItem = ({
  id, image, title, price, qty, slug,
}) => {
  const cartCtx = useContext(CartContext);
  const clientKey = useClientKey();
  const { sendRequest, error, isLoading } = useHttp();
  const updateQuantityHandler = (quantity) => {
    cartCtx.updateCartTemporary({ id, quantity });
  };
  const removeSuccessHandler = () => {
    cartCtx.updateCart();
  };
  const { highlightedHandler } = useToaster({
    isSuccess: !isLoading && !error,
    isFailed: !isLoading && error,
    textSuccess: `${title} successfully removed from cart`,
    textFailed: 'Failed to remove item from cart, please try again',
    onSuccess: removeSuccessHandler,
  });
  const removeCartHandler = () => {
    const removeConfirm = window.confirm(`Do you want to remove ${title}?`);
    if (removeConfirm) {
      highlightedHandler(true);
      sendRequest({
        url: endpoints.cart(),
        method: 'DELETE',
        data: {
          id,
          clientKey: clientKey.token,
        },
      });
    }
  };
  return (
    (
      <div className={classes.item}>
        <Link to={`/product/${slug}`}>
          <img
            src={image}
            alt={title}
          />
        </Link>
        <div className={classes.info}>
          <Link to={`/product/${slug}`}>
            <h3>{title}</h3>
          </Link>
          <p>{`Rp${printFormatPrice(price)}`}</p>
          <div className={classes.actions}>
            <QuantityAction quantity={qty} onQuantity={updateQuantityHandler} smallAction />
            <button type="button" className={classes.trash} onClick={removeCartHandler}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductItem;
