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
      ...state,
      loading: true,
    };
  }
  if (action.type === 'SUCCESS') {
    result = {
      ...state,
      loading: false,
      responseData: action.responseData,
    };
  }
  if (action.type === 'ERROR') {
    result = {
      ...state,
      loading: false,
      error: action.errorMessage,
      slugIsExist: action.slugIsExist,
    };
  }
  return result;
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback(({
    method, url, headers, data: bodyDaya,
  }) => {
    dispatch({ type: 'SEND' });
    axios({
      url,
      method: method || 'GET',
      headers: headers || defaultConfig.headers,
      data: bodyDaya || null,
      timeout: 5000,
    })
      .then((res) => {
        const { success, data } = res.data;
        if (res.status === 200 && success) {
          dispatch({ type: 'SUCCESS', responseData: data });
        } else {
          dispatch({
            type: 'ERROR',
            errorMessage: data.message || 'Something went wrong!',
            slugIsExist: data.slugIsExist || true,
          });
        }
      })
      .catch((err) => {
        let errorMessage;
        if (err.message === 'Network Error') {
          errorMessage = 'Could not make a request to the server, please try again.';
        } else if (err.message.includes('timeout')) {
          errorMessage = 'The server is not responding, please try again.';
        } else {
          errorMessage = 'Something went wrong!';
        }
        dispatch({ type: 'ERROR', errorMessage });
      });
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
