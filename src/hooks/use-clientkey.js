import { useState, useEffect } from 'react';
import { generateRandomString } from '../lib/function';

const CLIENT_KEY = 'CLIENT_KEY';
const getToken = localStorage.getItem(CLIENT_KEY);

const useClientKey = () => {
  const [token, setToken] = useState(getToken);
  const setItem = () => {
    const randomString = generateRandomString();
    localStorage.setItem(CLIENT_KEY, randomString);
    setToken(randomString);
  };
  useEffect(() => {
    if (!token) {
      setItem();
    }
  }, [token]);
  return {
    token,
    setItem,
  };
};

export default useClientKey;
