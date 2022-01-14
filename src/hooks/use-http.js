import { useCallback, useState } from "react";
import axios from "axios";

const defaultConfig = {
  headers: { "Content-Type": "application/json" },
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(({ method, url, headers, data }) => {
    setIsLoading(true);
    axios({
      url,
      method: method || "GET",
      headers: headers || defaultConfig.headers,
      data: data || null,
    })
      .then((res) => {
        const { success, data } = res.data;
        if (res.status === 200 && success) {
          setResponseData(data);
        } else {
          setError(data.message || "Something went wrong!");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        let errorMessage;
        if (err.message === "Network Error") {
          errorMessage =
            "Could not make a request to the server, please try again";
        } else {
          errorMessage = "Something went wrong";
        }
        setError(errorMessage);
      });
  }, []);

  return {
    sendRequest,
    isLoading,
    data: responseData,
    error,
  };
};

export default useHttp;
