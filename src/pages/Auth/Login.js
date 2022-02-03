import { Link } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import { breadcrumbs } from '../../data/banner';

import classes from './Auth.module.css';
import LoginForm from './LoginForm';

const Login = () => (
  <Layout title="Login">
    <BannerTitle title="LOGIN" breadcrumb={breadcrumbs} />
    <main className={classes.main}>
      <LoginForm />
      <p className={classes.link}>
        Don&apos;t have an account yet?
        {' '}
        <Link to="/register">Register here</Link>
      </p>
    </main>
  </Layout>
);

export default Login;
