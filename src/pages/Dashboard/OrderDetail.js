import { useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import OrderDetail from '../../components/Orders/OrderDetail';
import Menu from './Menu';
import Button from '../../components/UI/Button/Button';
import useURLQuery from '../../hooks/use-urlquery';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import { breadcrumbs } from '../../data/banner';

import classes from './Dashboard.module.css';

const DashboardOrderDetail = () => {
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
      history.push('/dashboard/orders');
    }
  }, [slugIsExist]);

  let contentWrapper;
  if (isLoading) {
    contentWrapper = <h3>LOADING...</h3>;
  }

  if (!isLoading && !error && order && products) {
    contentWrapper = <OrderDetail order={order} products={products} />;
  }

  return (
    <Layout title="Detail Order">
      <BannerTitle title="DETAIL ORDER" breadcrumb={breadcrumbs} />
      <main className={classes.wrapper}>
        <Menu menu="orders" />
        <Link to="/dashboard/orders">
          <Button title="See All Orders" />
        </Link>
        {contentWrapper}
      </main>
    </Layout>
  );
};

export default DashboardOrderDetail;
