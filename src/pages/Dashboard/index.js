/* eslint-disable max-len */

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import Menu from './Menu';
import { breadcrumbs } from '../../data/banner';

import classes from './Dashboard.module.css';

const Dashboard = () => (
  <Layout title="Dashboard">
    <BannerTitle title="DASHBOARD" breadcrumb={breadcrumbs} />
    <main className={classes.wrapper}>
      <Menu />
      <h2 className={classes.title}>WELCOME TO LOOKBOUTIQUESTORE</h2>
      <p className={classes.information}>Hello Toni Suwendi</p>
      <p className={classes.information}>From your account dashboard you can view your all orders, view detail order, and logout.</p>
    </main>
  </Layout>
);

export default Dashboard;
