import { useCallback, useReducer } from 'react';
import axios from 'axios';

const defaultConfig = {
  headers: { 'Content-Type': 'application/json' },
};

const initialState = {
  loading: false,
  responseData: [],
  error: null,
  slugIsExist: true,
};

const httpReducer = (state = initialState, action) => {
  let result = state;
  if (action.type === 'SEND') {
    result = {
      loading: true,
      responseData: [],
      error: null,
      slugIsExist: true,
    };
  }
  if (action.type === 'SUCCESS') {
    result = {
      loading: false,
      responseData: action.responseData,
      error: null,
      slugIsExist: true,
    };
  }
  if (action.type === 'ERROR') {
    result = {
      loading: false,
      responseData: [],
      error: action.errorMessage,
      slugIsExist: action.slugIsExist,
    };
  }
  return result;
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback(async ({
    method, url, headers, data: bodyDaya,
  }) => {
    dispatch({ type: 'SEND' });
    try {
      const response = await axios({
        url,
        method: method || 'GET',
        headers: headers || defaultConfig.headers,
        data: bodyDaya || null,
        timeout: 10000,
      });
      const { success, data } = response.data;
      if (response.status === 200 && success) {
        dispatch({ type: 'SUCCESS', responseData: data });
      } else {
        dispatch({
          type: 'ERROR',
          errorMessage: response.data.message || 'Something went wrong!',
          slugIsExist: data?.slugIsExist || true,
        });
      }
    } catch (err) {
      let errorMessage;
      if (err.message === 'Network Error') {
        errorMessage = 'Could not make a request to the server, please try again.';
      } else if (err.message.includes('timeout')) {
        errorMessage = 'The server is not responding, please try again.';
      } else {
        errorMessage = 'Something went wrong!';
      }
      dispatch({ type: 'ERROR', errorMessage });
    }
  }, []);

  return {
    sendRequest,
    isLoading: httpState.loading,
    data: httpState.responseData,
    error: httpState.error,
    slugIsExist: httpState.slugIsExist,
  };
};

export default useHttp;
