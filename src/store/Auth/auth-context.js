import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
