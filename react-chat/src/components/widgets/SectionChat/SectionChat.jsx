import clsx from 'clsx';
import styles from './sectionChat.module.scss';
import { PrivateMessage } from './ui/PrivateMessage/PrivateMessage';
import { GeneralMessage } from './ui/GeneralMessage/GeneralMessage';
import { Loader } from '../Loader/Loader';

export function SectionChat({
  messages,
  isPrivateType,
  currentUserId,
  messagesContainerRef,
  handleScrollMessages,
  isLoading,
}) {
  const isFirstLoading = isLoading && messages.length < 1;

  const renderMessages = messages.map((item) =>
    isPrivateType ? (
      <PrivateMessage
        key={item.id}
        currentUserId={currentUserId}
        messageData={item}
      />
    ) : (
      <GeneralMessage
        key={item.id}
        currentUserId={currentUserId}
        messageData={item}
      />
    )
  );

  return (
    <section id="sectionChat" className={styles.section} tabIndex="-1">
      {isFirstLoading ? (
        <Loader isLoading={isFirstLoading} />
      ) : renderMessages.length < 1 ? (
        <div className={styles.emptyInfoMessage}>Пока сообщений нет</div>
      ) : (
        <div className={styles.container}>
          <div
            onScroll={handleScrollMessages}
            ref={messagesContainerRef}
            className={clsx(
              styles.messagesList,
              !isPrivateType && styles.notPrivate
            )}
          >
            {renderMessages}
          </div>
        </div>
      )}
    </section>
  );
}
