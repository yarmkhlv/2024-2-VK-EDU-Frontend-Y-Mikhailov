import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../../providers/helpers/useAuth';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import styles from './createPrivateChat.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserItem } from '../../../UserItem/UserItem';
import { successToast } from '../../../../../utils/toastes/toastes';

const API_URL = import.meta.env.VITE_API_URL;

const COUNT_USER_PAGES = 20;
const IS_ALREADY_EXIST = 'Private chat with these members already exists';

export function CreatePrivateChat({ onClickReturn }) {
  const navigate = useNavigate();

  const { accessToken, refreshAccessToken } = useAuth();

  const [userList, setUserList] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userListContainerRef = useRef(null);
  const [lastHeight, setLastHeight] = useState(null);

  const getUsers = async (page, retryCount = 1) => {
    if (lastPage && page >= lastPage) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/users/?page=${page}&page_size=${COUNT_USER_PAGES}`,
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
            return getUsers(page, retryCount - 1);
          }
        } else throw new Error(`Ошибка ${response.status}`);
      } else {
        const data = await response.json();
        const { count, results } = data;
        if (!lastPage) {
          const convertCountToLastPage = Math.ceil(count / COUNT_USER_PAGES);
          setLastPage(convertCountToLastPage);
        }
        setUserList((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.error('Error:', error.message);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickUser = async (userId, retryCount = 1) => {
    try {
      const response = await fetch(`${API_URL}/chats/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ is_private: true, members: [userId] }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            return handleClickUser(userId, retryCount - 1);
          }
        } else if (response.status === 400) {
          const dataError = await response.json();
          const isAlready = dataError[0] === IS_ALREADY_EXIST;
          if (isAlready) {
            successToast('Чат с данным пользователем уже существует.', 3000);
            onClickReturn();
          } else throw new Error(`Ошибка ${response.status}`);
        } else throw new Error(`Ошибка ${response.status}`);
      } else {
        const data = await response.json();

        navigate(`/chat/${data.id}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      navigate('/');
    }
  };

  const handleScroll = (e) => {
    const containerElement = e.target;
    const { scrollTop, scrollHeight, clientHeight } = containerElement;

    const isBottom = scrollHeight - (scrollTop + clientHeight) < 5;

    if (isBottom && !isLoading) {
      setLastHeight(scrollHeight);
      const newPageNumber = page + 1;
      setPage(newPageNumber);
      getUsers(newPageNumber);
    }
  };

  const renderUserList = userList.map((item) => (
    <UserItem
      key={item.id}
      {...item}
      handleClickUser={() => handleClickUser(item.id)}
    />
  ));

  useEffect(() => {
    if (!userListContainerRef.current || !lastHeight) return;
    userListContainerRef.current.scrollTop =
      lastHeight - userListContainerRef.current.clientHeight;
  }, [userList]);

  useEffect(() => {
    if (accessToken) {
      getUsers(page);
    } else {
      navigate('/');
    }
  }, [accessToken]);

  if (renderUserList?.length < 1) return null;

  return (
    <>
      <div className={styles.header}>
        <button onClick={onClickReturn}>
          <ArrowBackIosNewIcon sx={{ color: '#837d7d' }} />
        </button>
        <div className={styles.title}>Выберите пользователя</div>
      </div>
      <div
        ref={userListContainerRef}
        onScroll={handleScroll}
        className={styles.containerUserList}
      >
        {renderUserList}
      </div>
    </>
  );
}
