import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import {
  clearTokens,
  setRefreshToken,
  setTokens,
  setAuthChecking,
} from '../../store/auth/slice';
import { refreshTokens } from '../../store/auth/thunk';

const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 минут в миллисекундах

const saveTokensAtSessionStorage = (access, refresh) => {
  sessionStorage.setItem('accessToken', access);
  sessionStorage.setItem('refreshToken', refresh);
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refreshToken } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearTokens());
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    navigate('/', { replace: true });
  };

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
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
      dispatch(setAuthChecking(false));
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(() => {
        dispatch(refreshTokens()).then((action) => {
          if (refreshTokens.fulfilled.match(action)) {
            const { access, refresh } = action.payload;
            saveTokensAtSessionStorage(access, refresh);
          } else {
            handleLogout();
          }
        });
      }, REFRESH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [refreshToken, dispatch]);

  return <>{children}</>;
}
