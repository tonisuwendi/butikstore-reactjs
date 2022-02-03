import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import BannerTitle from '../../components/BannerTitle/BannerTitle';
import Layout from '../../components/Layout/Default';
import useHttp from '../../hooks/use-http';
import UIContext from '../../store/UI/ui-context';
import endpoints from '../../lib/endpoints';
import useToaster from '../../hooks/use-toaster';
import { breadcrumbs } from '../../data/banner';

import classes from './Auth.module.css';
import RegisterForm from './RegisterForm';

const Register = () => {
  const uiCtx = useContext(UIContext);
  const history = useHistory();

  const {
    sendRequest, isLoading, error, data: responseData,
  } = useHttp();

  const afterRegisterSuccess = () => {
    history.push('/login');
  };

  const { highlightedHandler } = useToaster({
    isSuccess: !isLoading && !error,
    textSuccess: 'Register successfully, please login using the username and password.',
    onSuccess: afterRegisterSuccess,
  });

  const registerHandler = (data) => {
    uiCtx.toggleLoading('FULLSCREEN');
    sendRequest({
      url: endpoints.auth('register'),
      method: 'POST',
      data,
    });
  };

  const registerSuccess = () => {
    highlightedHandler(true);
  };

  const notLoadingHandler = () => {
    uiCtx.toggleLoading('');
  };

  return (
    <Layout title="Register">
      <BannerTitle title="REGISTER" breadcrumb={breadcrumbs} />
      <main className={classes.main}>
        <RegisterForm
          isLoading={isLoading}
          error={error}
          responseData={responseData}
          onRegister={registerHandler}
          onSuccess={registerSuccess}
          onNotLoading={notLoadingHandler}
        />
        <p className={classes.link}>
          Already have an account?
          {' '}
          <Link to="/login">Login here</Link>
        </p>
      </main>
    </Layout>
  );
};

export default Register;
