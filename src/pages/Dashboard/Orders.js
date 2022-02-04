import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import Menu from './Menu';
import { breadcrumbs } from '../../data/banner';

import classes from './Dashboard.module.css';

const DashboardOrders = () => (
  <Layout title="Orders">
    <BannerTitle title="ORDERS" breadcrumb={breadcrumbs} />
    <main className={classes.wrapper}>
      <Menu menu="orders" />
    </main>
  </Layout>
);

export default DashboardOrders;
