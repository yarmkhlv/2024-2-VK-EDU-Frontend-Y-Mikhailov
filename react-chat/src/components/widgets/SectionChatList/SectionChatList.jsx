/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatItem } from '../ChatItem/ChatItem';
import { Menu } from './ui/Menu/Menu';
import { fetchChatList, updateChatList } from '../../../store/chatList/thunk';
import { resetChatState } from '../../../store/chatList/slice';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import styles from './sectionChatList.module.scss';
import clsx from 'clsx';
import { Loader } from '../Loader/Loader';

export function SectionChatList({ openModal, setTypeCreateChat }) {
  const chatListRef = useRef(null);

  const dispatch = useDispatch();
  const { isAuthChecking } = useSelector((state) => state.auth);
  const { chatList, isLoading, nextPageUrl } = useSelector(
    (state) => state.chatList
  );
  const isFirstLoading = isLoading && chatList.length < 1;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [lastHeight, setLastHeight] = useState(null);

  const loadMoreChats = () => {
    if (nextPageUrl) {
      dispatch(updateChatList(nextPageUrl));
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
      loadMoreChats();
    }
  };

  useEffect(() => {
    if (!chatListRef.current || !lastHeight) return;
    chatListRef.current.scrollTop =
      lastHeight - chatListRef.current.clientHeight;
  }, [chatList]);

  useEffect(() => {
    if (chatListRef.current) {
      const containerElement = chatListRef.current;
      const { scrollHeight, clientHeight } = containerElement;

      if (scrollHeight <= clientHeight && !isLoading && nextPageUrl) {
        loadMoreChats();
      }
    }
  }, [chatList, isLoading, nextPageUrl]);

  useEffect(() => {
    if (isAuthChecking) return;
    if (chatList.length === 0) {
      dispatch(fetchChatList());
    }

    return () => {
      dispatch(resetChatState());
    };
  }, [dispatch, isAuthChecking]);

  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        {isFirstLoading ? (
          <Loader isLoading={isFirstLoading} />
        ) : (
          <>
            <div
              ref={chatListRef}
              onScroll={handleScrollChatList}
              className={styles.chatList}
            >
              {renderChatList}
            </div>

            <div className={styles.createChatContainer}>
              <button
                aria-label="Кнопка создания нового чата"
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
          </>
        )}
      </div>
    </section>
  );
}
