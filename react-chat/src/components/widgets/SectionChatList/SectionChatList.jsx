import { useState, useEffect, useRef } from 'react';
import { ChatItem } from '../ChatItem/ChatItem';
import { useAuth } from '../../providers/helpers/useAuth';
import { Menu } from './ui/Menu/Menu';
import { rejectToast } from '../../../utils/toastes/toastes';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import styles from './sectionChatList.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const INVALID_CREATE_TOKEN_ERROR = `Ошибка в создании токена`;

export function SectionChatList({ openModal, setTypeCreateChat }) {
  const navigate = useNavigate();

  const chatListRef = useRef(null);

  const { accessToken, refreshAccessToken } = useAuth();

  const [chatList, setChatList] = useState([]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [fetchUrl, setFetchUrl] = useState(`${API_URL}/chats/?page_size=10`);
  const [isLoading, setIsLoading] = useState(false);

  const [lastHeight, setLastHeight] = useState(null);

  const fetchChats = async (retryCount = 1) => {
    if (!fetchUrl || isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 && retryCount > 0) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            return fetchChats(retryCount - 1);
          }
        } else throw new Error(`Ошибка ${response.status}`);
      } else {
        const data = await response.json();

        const { next, results } = data;
        setChatList((prev) => [...prev, ...results]);
        setFetchUrl(next);
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (error.message === INVALID_CREATE_TOKEN_ERROR) {
        navigate('/');
      } else {
        rejectToast('Не удалось загрузить предыдущие чаты.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderChatList = chatList.map((item) => {
    return <ChatItem key={item.id} {...item} />;
  });

  const handleClickMenuBtn = () => {
    setIsOpenMenu((prev) => {
      return !prev;
    });
  };

  const handleScrollChatList = (e) => {
    const containerElement = e.target;
    const { scrollTop, scrollHeight, clientHeight } = containerElement;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 1;
    if (isBottom && !isLoading) {
      setLastHeight(scrollHeight);
      fetchChats();
    }
  };

  useEffect(() => {
    if (!chatListRef.current || !lastHeight) return;
    chatListRef.current.scrollTop =
      lastHeight - chatListRef.current.clientHeight;
  }, [chatList]);

  useEffect(() => {
    if (accessToken) {
      fetchChats();
    } else {
      navigate('/');
    }
  }, [accessToken]);

  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <div
          ref={chatListRef}
          onScroll={handleScrollChatList}
          className={styles.chatList}
        >
          {renderChatList}
        </div>
        <div className={styles.createChatContainer}>
          <button
            className={clsx(
              styles.createChatBtn,
              isOpenMenu && styles.noAnimation
            )}
            onClick={handleClickMenuBtn}
          >
            {isOpenMenu ? (
              <CloseIcon sx={{ color: '#837d7d' }} />
            ) : (
              <EditIcon sx={{ color: '#837d7d' }} />
            )}
          </button>
          {isOpenMenu && (
            <Menu
              openModal={openModal}
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
              setTypeCreateChat={setTypeCreateChat}
            />
          )}
        </div>
      </div>
    </section>
  );
}
