import { useNavigate } from 'react-router-dom';

const useSearch = () => {
  const navigate = useNavigate();
  function searchHandler(e) {
    navigate('/search', { state: e.target.value });
  }
  return searchHandler;
};

export default useSearch;
