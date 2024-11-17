import { useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const setTokens = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        'https://vkedu-fullstack-div2.ru/api/auth/refresh/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка получения токена');
      }

      const data = await response.json();
      const { access, refresh } = data;
      setTokens(access, refresh);
      return access;
    } catch (err) {
      console.error('Token refresh error', err);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
