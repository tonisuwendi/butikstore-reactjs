import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import Info from '../../components/UI/Info/Info';
import Button from '../../components/UI/Button/Button';
import Menu from './Menu';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import AuthContext from '../../store/Auth/auth-context';
import OrderList from '../../components/Orders/OrderList';
import { breadcrumbs } from '../../data/banner';

import classes from './Dashboard.module.css';

const DashboardOrders = () => {
  const authCtx = useContext(AuthContext);
  const { sendRequest, data } = useHttp();

  useEffect(() => {
    sendRequest({
      url: endpoints.orders(),
      headers: { Authorization: `Bearer ${authCtx.token}` },
    });
  }, [sendRequest]);

  let orderContent = (
    <div className={classes.infoEmpty}>
      <Info text="No order has been made yet." small />
      <Link to="/shop-all">
        <Button title="Browse products" size="lg" outline />
      </Link>
    </div>
  );

  if (data.length > 0) {
    orderContent = <OrderList orders={data} />;
  }

  return (
    <Layout title="Orders">
      <BannerTitle title="ORDERS" breadcrumb={breadcrumbs} />
      <main className={classes.wrapper}>
        <Menu menu="orders" />
        {orderContent}
      </main>
    </Layout>
  );
};

export default DashboardOrders;
