import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from '../../store/Auth/auth-context';

const ProtectedRoute = ({
  path, component, auth, exact = false,
}) => {
  const authCtx = useContext(AuthContext);

  if (auth && authCtx.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  if (!auth && !authCtx.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default ProtectedRoute;
