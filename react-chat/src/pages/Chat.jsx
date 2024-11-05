import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HeaderChat } from '../components/widgets/HeaderChat/HeaderChat';
import { SectionChat } from '../components/widgets/SectionChat/SectionChat';
import { SectionInput } from '../components/widgets/SectionInput/SectionInput';
import { scrollToBottom } from '../utils/scrollToBottom';

export function Chat() {
  const { userId } = useParams();
  const correctedUserId = Number(userId.slice(1));
  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];
  const findedUser = usersFromLocalStorage.find(
    (user) => user.id === correctedUserId
  );

  const { id, name, avatarUrl, messages } = findedUser;
  const [actualMessages, setActualMessages] = useState(messages);

  useEffect(() => {
    scrollToBottom('sectionChat');
  }, [actualMessages]);

  return (
    <>
      <HeaderChat avatarUrl={avatarUrl} userName={name} />
      <main className="main">
        <SectionChat messages={actualMessages} />
        <SectionInput id={id} setActualMessages={setActualMessages} />
      </main>
    </>
  );
}
