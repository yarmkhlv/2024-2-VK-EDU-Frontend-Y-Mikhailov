import { HeaderChatList } from '../components/widgets/HeaderChatList/HeaderChatList';
import { SectionChatList } from '../components/widgets/SectionChatList/SectionChatList';
import PropTypes from 'prop-types';

export function ChatList({ setId }) {
  return (
    <>
      <HeaderChatList />
      <main className="main">
        <SectionChatList setId={setId} />
      </main>
    </>
  );
}

ChatList.propTypes = {
  setId: PropTypes.func.isRequired,
};
