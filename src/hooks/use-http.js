import { useCallback, useReducer } from "react";
import axios from "axios";

const defaultConfig = {
  headers: { "Content-Type": "application/json" },
};

const initialState = {
  loading: false,
  responseData: [],
  error: null,
};

const httpReducer = (state = initialState, action) => {
  if (action.type === "SEND") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      responseData: action.responseData,
    };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      loading: false,
      error: action.errorMessage,
    };
  }
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback(({ method, url, headers, data }) => {
    dispatch({ type: "SEND" });
    axios({
      url,
      method: method || "GET",
      headers: headers || defaultConfig.headers,
      data: data || null,
      timeout: 5000
    })
      .then((res) => {
        const { success, data } = res.data;
        if (res.status === 200 && success) {
          dispatch({ type: "SUCCESS", responseData: data });
        } else {
          dispatch({
            type: "ERROR",
            errorMessage: data.message || "Something went wrong!",
          });
        }
      })
      .catch((err) => {
        let errorMessage;
        if (err.message === "Network Error") {
          errorMessage =
            "Could not make a request to the server, please try again.";
        }else if(err.message.includes("timeout")){
          errorMessage = "The server is not responding, please try again."
        } else {
          errorMessage = "Something went wrong!";
        }
        dispatch({ type: "ERROR", errorMessage });
      });
  }, []);

  return {
    sendRequest,
    isLoading: httpState.loading,
    data: httpState.responseData,
    error: httpState.error,
  };
};

export default useHttp;
