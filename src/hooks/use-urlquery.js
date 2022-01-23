import { useLocation } from 'react-router-dom';

const useURLQuery = (query) => {
  const location = useLocation();
  const newUrl = new URLSearchParams(location.search);
  return newUrl.get(query);
};

export default useURLQuery;
