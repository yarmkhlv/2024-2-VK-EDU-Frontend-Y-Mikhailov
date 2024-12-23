import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokens } from '../../store/auth/thunk';
import { clearTokens } from '../../store/auth/slice';

const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 минут в миллисекундах

const saveTokensAtSessionStorage = (access, refresh) => {
  sessionStorage.setItem('accessToken', access);
  sessionStorage.setItem('refreshToken', refresh);
};

export function AuthIntervalRefreshProvider({ children }) {
  const dispatch = useDispatch();

  const { refreshToken } = useSelector((state) => state.auth);

  const handleLogout = useCallback(() => {
    dispatch(clearTokens());
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
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
  }, [refreshToken, dispatch, handleLogout]);

  return <>{children}</>;
}
