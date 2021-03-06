import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Layout from '../../components/Layout/Default';
import OrderDetail from '../../components/Orders/OrderDetail';
import Info from '../../components/UI/Info/Info';
import useHttp from '../../hooks/use-http';
import useURLQuery from '../../hooks/use-urlquery';
import endpoints from '../../lib/endpoints';

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

  let contentWrapper;
  if (!isLoading && !error && order && products) {
    contentWrapper = <OrderDetail order={order} products={products} />;
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
        {contentWrapper}
      </main>
    </Layout>
  );
};

export default Successfully;
