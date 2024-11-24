import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/providers/helpers/useAuth';

const API_URL = import.meta.env.VITE_API_URL;

export function useInfoChat(id) {
  const [infoChat, setInfoChat] = useState(null);
  const { accessToken, refreshAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfoChat = async (retryCount = 1) => {
      if ((!accessToken && !refreshAccessToken) || !id) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/chat/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 && retryCount > 0) {
            const newAccessToken = await refreshAccessToken();
            // Повторный запрос, если получен новый токен
            if (newAccessToken) {
              return fetchInfoChat(retryCount - 1);
            } else {
              throw new Error('Unable to refresh access token.');
            }
          } else throw new Error(`Ошибка ${response.status}`);
        } else {
          const data = await response.json();

          setInfoChat(data);
          return data;
        }
      } catch (error) {
        console.error('Error:', error.message);
        if (navigate) {
          navigate('/');
        }
      }
    };

    fetchInfoChat();
  }, [accessToken, refreshAccessToken, navigate, id]);

  return { infoChat };
}
