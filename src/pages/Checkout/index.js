import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import CartTotals from '../../components/Cart/CartTotals';
import ProductList from '../../components/Cart/ProductList';
import Layout from '../../components/Layout/Default';
import CheckoutForm from './CheckoutForm';
import CartContext from '../../store/Cart/cart-context';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import UIContext from '../../store/UI/ui-context';
import CartIsEmpty from '../Cart/CartIsEmpty';
import AuthContext from '../../store/Auth/auth-context';
import { breadcrumbs } from '../../data/banner';

import classes from './Checkout.module.css';

const Checkout = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const uiCtx = useContext(UIContext);
  const history = useHistory();
  const [formIsValid, setFormIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    sendRequest, isLoading, error, data: responseData,
  } = useHttp();

  useEffect(() => {
    if (!isLoading) {
      uiCtx.toggleLoading('');
    }
    if (!isLoading && error) {
      uiCtx.toggleToaster({
        text: error,
        error: true,
      });
    }
    if (!isLoading && !error && responseData.insertId) {
      cartCtx.updateCart();
      const { insertId, orderNumber, phone } = responseData;
      history.push(`/successfully/${orderNumber}?id=${insertId}&phone=${phone}`);
    }
  }, [isLoading, error]);

  const formIsValidHandler = (valid) => {
    setFormIsValid(valid);
  };

  const formDataHandler = (data) => {
    setFormData(data);
  };

  const orderHandler = () => {
    uiCtx.toggleLoading('FULLSCREEN');
    const data = {
      ...formData,
      clientKey: cartCtx.clientKey,
      token: authCtx.token,
    };
    sendRequest({
      url: endpoints.orders(),
      method: 'POST',
      data,
    });
  };

  let contentWrapper;
  if (cartCtx.totalItem === 0) {
    contentWrapper = <CartIsEmpty />;
  }

  const buttonClasses = [classes.button_order, formIsValid && !isLoading ? '' : classes.buttonInActive];

  return (
    <Layout title="Checkout">
      <BannerTitle title="CHECKOUT" breadcrumb={breadcrumbs} />
      {contentWrapper}
      {!contentWrapper && (
        <div className={classes.checkout}>
          <div className={classes.form}>
            <CheckoutForm onFormIsValid={formIsValidHandler} onFormData={formDataHandler} />
          </div>
          <div className={classes.myOrder}>
            <div className={classes.item}>
              <h2 className={classes.title}>Your order</h2>
              <ProductList products={cartCtx.items} />
            </div>
            <div className={classes.item}>
              <h2 className={classes.title}>Cart Totals</h2>
              <CartTotals />
              <button
                disabled={!formIsValid}
                className={buttonClasses.join(' ')}
                type="button"
                onClick={orderHandler}
              >
                {isLoading ? 'Loading...' : 'Place order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Checkout;
