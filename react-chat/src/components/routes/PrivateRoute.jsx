import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PAGES } from '../../utils/variables';
import { Loader } from '../widgets/Loader/Loader';

export function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const refreshToken = useSelector((state) => state.auth.refreshToken);

  useEffect(() => {
    if (refreshToken) {
      setLoading(false);
      return;
    } else {
      navigate(PAGES.LOGIN, { replace: true });
    }
  }, [refreshToken]);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return children;
}
