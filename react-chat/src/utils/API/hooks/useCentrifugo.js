import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Centrifuge } from 'centrifuge';
import {
  addMessage,
  updateMessage,
  deleteMessage,
} from '../../../store/messages/slice';
import { showNotification } from '../../showNotification';
import { ENDPOINTS } from '../endpoints';

export function useCentrifugo(id, currentUser) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const getConnectionToken = async () => {
    const response = await fetch(ENDPOINTS.CENTRIFUGO.CONNECT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    return data.token;
  };

  const getSubscriptionToken = async () => {
    const response = await fetch(ENDPOINTS.CENTRIFUGO.SUBSCRIBE, {
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
    if (!accessToken || !currentUser) return;

    let centrifuge;
    let subscription;

    const initializeCentrifuge = async () => {
      const connectToken = await getConnectionToken();
      const subscribeToken = await getSubscriptionToken();

      if (!centrifuge) {
        centrifuge = new Centrifuge(ENDPOINTS.CONNECTION_WEBSOCKET, {
          getToken: () => Promise.resolve(connectToken),
        });
      }

      if (!subscription) {
        subscription = centrifuge.newSubscription(currentUser.id, {
          getToken: () => Promise.resolve(subscribeToken),
        });

        subscription.on('publication', (ctx) => {
          const { event, message } = ctx.data;
          const isCurrentChat = id === message.chat;

          if (!isCurrentChat) {
            showNotification(message);
          } else {
            if (event === 'create') {
              dispatch(addMessage(message));
            } else if (event === 'update') {
              dispatch(updateMessage(message));
            } else if (event === 'delete') {
              dispatch(deleteMessage(message.id));
            }
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
  }, [accessToken, currentUser]);
}
