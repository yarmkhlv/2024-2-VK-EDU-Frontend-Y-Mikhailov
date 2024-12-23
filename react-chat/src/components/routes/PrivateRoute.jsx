import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PAGES } from '../../utils/variables';
import { jwtDecode } from 'jwt-decode';
import {
  clearTokens,
  setRefreshToken,
  setTokens,
  setAuthChecking,
} from '../../store/auth/slice';

const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 минут в миллисекундах

export function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(clearTokens());
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    navigate(PAGES.LOGIN, { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setAuthChecking(true));
      const storedAccessToken = sessionStorage.getItem('accessToken');
      const storedRefreshToken = sessionStorage.getItem('refreshToken');

      if (storedRefreshToken) {
        const decoded = jwtDecode(storedRefreshToken);
        const expirationTime = decoded.exp * 1000;
        const now = Date.now();

        if (expirationTime - now > REFRESH_INTERVAL) {
          if (storedAccessToken) {
            dispatch(
              setTokens({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
              })
            );
          } else {
            dispatch(setRefreshToken(storedRefreshToken));
          }
          dispatch(setAuthChecking(false));
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    checkAuth();
  }, [dispatch, handleLogout]);

  return children;
}
