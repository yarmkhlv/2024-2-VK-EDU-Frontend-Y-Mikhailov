import { useState, useEffect } from 'react';
import { ChatItem } from '../ChatItem/ChatItem';
import { useAuth } from '../../providers/helpers/useAuth';
import { Menu } from './ui/Menu/Menu';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import styles from './sectionChatList.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export function SectionChatList({ openModal, setTypeCreateChat }) {
  const navigate = useNavigate();

  const { accessToken, refreshAccessToken } = useAuth();

  const [chatList, setChatList] = useState([]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const fetchChats = async (retryCount = 1) => {
    try {
      const response = await fetch(
        'https://vkedu-fullstack-div2.ru/api/chats/',
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
            return fetchChats(retryCount - 1);
          }
        } else throw new Error(`Ошибка ${response.status}`);
      } else {
        const data = await response.json();

        const { results } = data;
        setChatList(results);
      }
    } catch (error) {
      console.error('Error:', error.message);
      navigate('/');
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
        <div className={styles.chatList}>{renderChatList}</div>
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
