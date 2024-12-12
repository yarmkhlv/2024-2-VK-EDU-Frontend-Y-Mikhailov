import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderChat } from '../components/widgets/HeaderChat/HeaderChat';
import { SectionChat } from '../components/widgets/SectionChat/SectionChat';
import { SectionInput } from '../components/widgets/SectionInput/SectionInput';
import { Dropzone } from '../components/shared/Dropzone/Dropzone';
import { useCentrifugo } from '../utils/API/hooks';
import { rejectToast } from '../utils/toastes/toastes';
import { getMessages, updateMessages } from '../store/messages/thunk';
import { fetchCurrentUser } from '../store/currentUser/thunk';
import { getInfoChat } from '../store/currentChat/thunk';
import { resetCurrentChatState } from '../store/currentChat/slice';
import { resetCurrentUserState } from '../store/currentUser/slice';
import { resetMessagesState } from '../store/messages/slice';
import { Loader } from '../components/widgets/Loader/Loader';

export function Chat() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isAuthChecking } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.currentUser.data);
  const chatInfo = useSelector((state) => state.currentChat.data);

  const { messages, isLoading, nextPageUrl } = useSelector(
    (state) => state.messages
  );

  const [selectedImages, setSelectedImages] = useState([]);

  const messagesContainerRef = useRef(null);
  const [lastHeight, setLastHeight] = useState(null);

  useCentrifugo(id, currentUser);

  const handleScrollMessages = (e) => {
    if (!nextPageUrl) return;
    const containerElement = e.target;
    const { scrollTop, scrollHeight, clientHeight } = containerElement;
    const isTop = scrollHeight - (Math.abs(scrollTop) + clientHeight) < 5;
    if (isTop && !isLoading) {
      setLastHeight(scrollHeight);
      dispatch(updateMessages(nextPageUrl));
    }
  };

  const handleDrop = (e) => {
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );

    const previews = files.map((file) => {
      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    });
    if (previews.length > 5) {
      rejectToast('Можно загрузить не больше 5 файлов');
      return;
    }
    setSelectedImages(previews);
  };

  useEffect(() => {
    if (isAuthChecking) return;
    if (messages.length === 0) {
      dispatch(getMessages(id));
    }
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
    if (!chatInfo) {
      dispatch(getInfoChat(id));
    }

    return () => {
      dispatch(resetCurrentChatState());
      dispatch(resetCurrentUserState());
      dispatch(resetMessagesState());
    };
  }, [dispatch, isAuthChecking]);

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

  if (isAuthChecking) {
    return <Loader isLoading={isAuthChecking} />;
  }

  return (
    <Dropzone handleDrop={handleDrop}>
      <HeaderChat
        title={chatInfo?.title}
        avatar={chatInfo?.avatar}
        is_private={chatInfo?.is_private}
      />

      <main className="main">
        <SectionChat
          messages={messages}
          isPrivateType={chatInfo?.is_private}
          currentUserId={currentUser?.id}
          messagesContainerRef={messagesContainerRef}
          handleScrollMessages={handleScrollMessages}
          isLoading={isLoading}
        />
        <SectionInput
          id={id}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </main>
    </Dropzone>
  );
}
