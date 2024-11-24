import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { HeaderChat } from '../components/widgets/HeaderChat/HeaderChat';
import { SectionChat } from '../components/widgets/SectionChat/SectionChat';
import { SectionInput } from '../components/widgets/SectionInput/SectionInput';
import { useAuth } from '../components/providers/helpers/useAuth';
import { useInfoChat, useCentrifugo, useCurrentUser } from '../utils/API/hooks';

const API_URL = import.meta.env.VITE_API_URL;

const COUNT_MESSAGE_PAGES = 30;

export function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { accessToken, refreshAccessToken } = useAuth();
  const { currentUser } = useCurrentUser();

  const { infoChat } = useInfoChat(id);

  const [messages, setMessages] = useState([]);
  const [countMessages, setCountMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef(null);
  const [lastHeight, setLastHeight] = useState(null);

  useCentrifugo(currentUser, setMessages, setCountMessages);

  const getMessages = async (page, retryCount = 1) => {
    if (countMessages && messages.length >= countMessages) return;
    setIsLoading(true);
    const calcNextPage = Math.trunc(messages.length / COUNT_MESSAGE_PAGES) + 1;
    try {
      const response = await fetch(
        `${API_URL}/messages?chat=${id}&page=${calcNextPage}&page_size=${COUNT_MESSAGE_PAGES}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 && retryCount > 0) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            return getMessages(page, retryCount - 1);
          } else {
            throw new Error('Unable to refresh access token.');
          }
        } else throw new Error(`Ошибка ${response.status}`);
      } else {
        const data = await response.json();
        const { count, results } = data;
        setCountMessages(count);
        const existingIds = new Set(messages.map((msg) => msg.id));
        const filteredMessages = results.filter(
          (msg) => !existingIds.has(msg.id)
        );
        setMessages((prevMessages) => [...prevMessages, ...filteredMessages]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error.message);

      navigate('/');
    }
  };

  const handleScrollMessages = (e) => {
    const containerElement = e.target;
    const { scrollTop, scrollHeight, clientHeight } = containerElement;
    const isTop = scrollHeight - (Math.abs(scrollTop) + clientHeight) < 5;
    if (isTop && !isLoading) {
      setLastHeight(scrollHeight);
      getMessages();
    }
  };

  useEffect(() => {
    if (accessToken) {
      getMessages();
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      messagesContainerRef.current.scrollTop = scrollHeight;
      return;
    } else {
      if (scrollTop === 0) {
        const diff = scrollHeight - lastHeight;
        messagesContainerRef.current.scrollTop = diff;
      }
    }
  }, [messages, lastHeight]);

  return (
    <>
      <HeaderChat
        title={infoChat?.title}
        avatar={infoChat?.avatar}
        is_private={infoChat?.is_private}
      />
      <main className="main">
        <SectionChat
          messages={messages}
          isPrivateType={infoChat?.is_private}
          currentUserId={currentUser?.id}
          messagesContainerRef={messagesContainerRef}
          handleScrollMessages={handleScrollMessages}
        />
        <SectionInput id={id} />
      </main>
    </>
  );
}
