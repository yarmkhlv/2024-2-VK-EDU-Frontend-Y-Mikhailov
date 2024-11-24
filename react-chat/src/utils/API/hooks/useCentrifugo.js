import { useEffect } from 'react';
import { Centrifuge } from 'centrifuge';
import { useAuth } from '../../../components/providers/helpers/useAuth';

const API_URL = import.meta.env.VITE_API_URL;

export function useCentrifugo(currentUser, setMessages, setCountMessages) {
  const { accessToken } = useAuth();

  const getConnectionToken = async () => {
    const response = await fetch(`${API_URL}/centrifugo/connect/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    return data.token;
  };

  const getSubscriptionToken = async () => {
    const response = await fetch(`${API_URL}/centrifugo/subscribe/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.token;
  };

  useEffect(() => {
    if (!accessToken || !currentUser || !setMessages) return;

    let centrifuge;
    let subscription;

    const initializeCentrifuge = async () => {
      const connectToken = await getConnectionToken();
      const subscribeToken = await getSubscriptionToken();

      if (!centrifuge) {
        centrifuge = new Centrifuge(
          'wss://vkedu-fullstack-div2.ru/connection/websocket/',
          {
            getToken: () => Promise.resolve(connectToken),
          }
        );
      }

      if (!subscription) {
        subscription = centrifuge.newSubscription(currentUser.id, {
          getToken: () => Promise.resolve(subscribeToken),
        });

        subscription.on('publication', (ctx) => {
          const { event, message } = ctx.data;

          if (event === 'create') {
            setMessages((prevMessages) => {
              if (prevMessages.some((msg) => msg.id === message.id)) {
                return prevMessages;
              }
              return [message, ...prevMessages];
            });
            if (setCountMessages) {
              setCountMessages((prev) => prev + 1);
            }
          } else if (event === 'update') {
            setMessages((prevMessages) =>
              prevMessages.map((msg) => (msg.id === message.id ? message : msg))
            );
          } else if (event === 'delete') {
            setMessages((prevMessages) =>
              prevMessages.filter((msg) => msg.id !== message.id)
            );
          }
        });

        subscription.subscribe();
        centrifuge.connect();
      }
    };

    initializeCentrifuge();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (centrifuge) {
        centrifuge.disconnect();
      }
    };
  }, [accessToken, currentUser, setMessages]);
}
