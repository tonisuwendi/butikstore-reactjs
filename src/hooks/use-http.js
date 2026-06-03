import { useCallback, useReducer, useRef } from 'react';
import { handleMockRequest } from '../mocks/mockApi';

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
  const requestIdRef = useRef(0);

  const sendRequest = useCallback(async ({
    method, url, headers, data: bodyData,
  }) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    dispatch({ type: 'SEND' });
    try {
      const response = await handleMockRequest({
        url,
        method: method || 'GET',
        headers: headers || {},
        data: bodyData || null,
      });
      if (requestId !== requestIdRef.current) return;

      const { success, data, message } = response.data;
      if (response.data.status === 200 && success) {
        dispatch({ type: 'SUCCESS', responseData: data });
      } else {
        dispatch({
          type: 'ERROR',
          errorMessage: message || 'Something went wrong!',
          slugIsExist: data?.slugIsExist !== false,
        });
      }
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      dispatch({ type: 'ERROR', errorMessage: 'Something went wrong!' });
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
