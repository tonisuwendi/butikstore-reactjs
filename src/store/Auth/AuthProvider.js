import { useEffect, useState } from 'react';

import AuthContext from './auth-context';
import useHttp from '../../hooks/use-http';
import endpoints from '../../lib/endpoints';

const TOKEN_KEY_STORAGE = 'token';

const AuthProvider = ({ children }) => {
  const tokenStorage = localStorage.getItem(TOKEN_KEY_STORAGE);

  let initialToken;
  if (tokenStorage) {
    initialToken = tokenStorage;
  }

  const [token, setToken] = useState(initialToken);

  const {
    sendRequest, isLoading, error, data,
  } = useHttp();

  useEffect(() => {
    sendRequest({
      url: endpoints.auth('verify-token'),
      headers: { Authorization: `Bearer ${token}` },
    });
  }, []);

  const loginHandler = (tokenData) => {
    setToken(tokenData);
    localStorage.setItem(TOKEN_KEY_STORAGE, tokenData);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY_STORAGE);
  };

  useEffect(() => {
    if (!isLoading && error) {
      logoutHandler();
    }
  }, [isLoading, error, data]);

  const userIsLoggedIn = !!token;

  const authValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
