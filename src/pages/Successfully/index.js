/* eslint-disable react/no-danger */

import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProductList from '../../components/Cart/ProductList';

import Layout from '../../components/Layout/Default';
import Info from '../../components/UI/Info/Info';
import useHttp from '../../hooks/use-http';
import useURLQuery from '../../hooks/use-urlquery';
import endpoints from '../../lib/endpoints';
import { printFormatPrice } from '../../lib/function';

import classes from './Successfully.module.css';

const Successfully = () => {
  const params = useParams();
  const history = useHistory();
  const idProduct = useURLQuery('id');
  const phone = useURLQuery('phone');
  const { orderNumber } = params;
  const {
    sendRequest, data, isLoading, error, slugIsExist,
  } = useHttp();

  useEffect(() => {
    sendRequest({
      url: endpoints.orders(`${orderNumber}?orderId=${idProduct}&phone=${phone}`),
    });
  }, [orderNumber, idProduct, phone]);

  const { order, products } = data;

  useEffect(() => {
    if (!slugIsExist) {
      history.push('/404');
    }
  }, [slugIsExist]);

  let orderWrapper;
  if (!isLoading && !error && order) {
    orderWrapper = (
      <>
        <div className={classes.orderItem}>
          <h4>Order Number</h4>
          <p>{order.order_number}</p>
          <h4>Total</h4>
          <p>{`Rp${printFormatPrice(order.total)}`}</p>
          <h4>Date</h4>
          <p>{order.date_order}</p>
        </div>
        <div className={classes.orderItem}>
          {order.notes && (
            <>
              <h4>Note</h4>
              <p>{order.notes}</p>
            </>
          )}
          <h4>Shipping Address</h4>
          <p>{order.name}</p>
          <p>
            <span
              dangerouslySetInnerHTML={{ __html: order.address.replace('\n', '<br/>') }}
            />
            {' - '}
            {order.postal_code}
          </p>
          <p>{order.phone}</p>
        </div>
      </>
    );
  }

  let productsWrapper;
  if (!isLoading && !error && products) {
    productsWrapper = <ProductList products={products} />;
  }

  return (
    <Layout title="Successfully">
      <main className={classes.wrapper}>
        <h2 className={classes.title}>
          Thank you.
          <br />
          Your order has been received.
        </h2>
        <div className={classes.hline} />
        <Info text="Kami akan menghubungi Anda melalui WhatsApp untuk mengirimkan panduan pembayaran." small />
        <div className={classes.order}>
          {orderWrapper}
        </div>
        <div className={classes.products}>
          <h4>Order details</h4>
          {productsWrapper}
        </div>
      </main>
    </Layout>
  );
};

export default Successfully;
