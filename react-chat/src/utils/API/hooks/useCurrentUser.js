import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/providers/helpers/useAuth';

const API_URL = import.meta.env.VITE_API_URL;

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { accessToken, refreshAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async (retryCount = 1) => {
      if (!accessToken && !refreshAccessToken) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/user/current/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 && retryCount > 0) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              // Если токен успешно обновлен, повторяем запрос
              return fetchCurrentUser(retryCount - 1);
            } else {
              throw new Error('Не удалось обновить токен');
            }
          } else {
            throw new Error(`Ошибка: статус ${response.status}`);
          }
        } else {
          const data = await response.json();
          setCurrentUser(data);
        }
      } catch (error) {
        console.error('Error fetching current user:', error.message);
        // Если навигация находится в роутинге
        if (navigate) {
          navigate('/');
        }
      }
    };

    fetchCurrentUser();
  }, [accessToken, refreshAccessToken, navigate]);

  return { currentUser };
};
