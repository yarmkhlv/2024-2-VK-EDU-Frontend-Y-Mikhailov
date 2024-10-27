import { useEffect, useState } from 'react';
import { HeaderChat } from '../components/widgets/HeaderChat/HeaderChat';
import { SectionChat } from '../components/widgets/SectionChat/SectionChat';
import { SectionInput } from '../components/widgets/SectionInput/SectionInput';
import PropTypes from 'prop-types';
import { scrollToBottom } from '../utils/scrollToBottom';

export function Chat({ user, onClickReturn }) {
  const { id, name, avatarUrl, messages } = user;
  const [actualMessages, setActualMessages] = useState(messages);

  useEffect(() => {
    scrollToBottom('sectionChat');
  }, [actualMessages]);

  return (
    <>
      <HeaderChat
        avatarUrl={avatarUrl}
        userName={name}
        onClickReturn={onClickReturn}
      />
      <main className="main">
        <SectionChat messages={actualMessages} />
        <SectionInput id={id} setActualMessages={setActualMessages} />
      </main>
    </>
  );
}

const messageShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
});

const userShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(messageShape),
});

Chat.propTypes = {
  user: userShape,
  onClickReturn: PropTypes.func.isRequired,
};
