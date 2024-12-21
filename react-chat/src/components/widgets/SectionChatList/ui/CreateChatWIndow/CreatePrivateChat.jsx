import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../Loader/Loader';
import {
  fetchUserList,
  updateUserList,
} from '../../../../../store/userList/thunk';
import { resetUserListState } from '../../../../../store/userList/slice';
import { createPrivateChat } from '../../../../../store/chatList/thunk';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import styles from './createPrivateChat.module.scss';
import { UserItem } from '../../../UserItem/UserItem';
import {
  rejectToast,
  successToast,
} from '../../../../../utils/toastes/toastes';

const IS_ALREADY_EXIST = 'Private chat with these members already exists';

export function CreatePrivateChat({ onClickReturn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userList, isLoading, nextPageUrl } = useSelector(
    (state) => state.userList
  );
  const isFirstLoading = isLoading && userList.length < 1;
  const userListContainerRef = useRef(null);
  const [lastHeight, setLastHeight] = useState(null);

  const handleClickUser = (userId) => {
    dispatch(createPrivateChat(userId))
      .unwrap()
      .then((data) => navigate(`/chat/${data.id}`))
      .catch((error) => {
        if (error === IS_ALREADY_EXIST) {
          successToast('Чат с данным пользователем уже существует.', 3000);
          onClickReturn();
        } else {
          console.error('Ошибка создания чата:', error);
          rejectToast(`Ошибка создания чата:, ${error}`, 3000);
        }
      });
  };

  const handleScroll = (e) => {
    const containerElement = e.target;
    const { scrollTop, scrollHeight, clientHeight } = containerElement;

    const isBottom = scrollHeight - (scrollTop + clientHeight) < 5;

    if (isBottom && !isLoading) {
      setLastHeight(scrollHeight);
      dispatch(updateUserList(nextPageUrl));
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
    if (userList.length === 0) {
      dispatch(fetchUserList());
    }
    return () => {
      dispatch(resetUserListState());
    };
  }, [dispatch]);

  return (
    <>
      {isFirstLoading ? (
        <Loader isLoading={isFirstLoading} />
      ) : (
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
      )}
    </>
  );
}
