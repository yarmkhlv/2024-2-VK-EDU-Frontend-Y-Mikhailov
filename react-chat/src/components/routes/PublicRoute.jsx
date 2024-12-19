import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PAGES } from '../../utils/variables';

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  useEffect(() => {
    if (refreshToken) {
      navigate(PAGES.CHAT_LIST, { replace: true });
    }
  }, [refreshToken, navigate]);

  return children;
};

export default PublicRoute;
