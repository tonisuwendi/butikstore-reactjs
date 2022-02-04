import { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import AuthContext from '../../store/Auth/auth-context';
import UIContext from '../../store/UI/ui-context';
import LoginForm from './LoginForm';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';
import useToaster from '../../hooks/use-toaster';
import { breadcrumbs } from '../../data/banner';

import classes from './Auth.module.css';

const Login = () => {
  const authCtx = useContext(AuthContext);
  const uiCtx = useContext(UIContext);
  const history = useHistory();

  const {
    sendRequest, isLoading, error, data: responseData,
  } = useHttp();

  const { highlightedHandler } = useToaster({
    isFailed: !isLoading && error,
    textFailed: error,
  });

  useEffect(() => {
    if (!isLoading) {
      uiCtx.toggleLoading('');
    }
    if (!isLoading && error) {
      highlightedHandler(true);
    }
    if (!isLoading && !error && responseData?.token) {
      authCtx.login(responseData.token);
      history.replace('/dashboard');
    }
  }, [isLoading, error, responseData]);

  const loginHandler = (data) => {
    uiCtx.toggleLoading('FULLSCREEN');
    sendRequest({
      url: endpoints.auth('login'),
      method: 'POST',
      data,
    });
  };

  return (
    <Layout title="Login">
      <BannerTitle title="LOGIN" breadcrumb={breadcrumbs} />
      <main className={classes.main}>
        <LoginForm
          isLoading={isLoading}
          onLogin={loginHandler}
        />
        <p className={classes.link}>
          Don&apos;t have an account yet?
          {' '}
          <Link to="/register">Register here</Link>
        </p>
      </main>
    </Layout>
  );
};

export default Login;
