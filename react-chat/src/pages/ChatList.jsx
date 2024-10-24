import { Modal } from '../components/shared/Modal/Modal';
import { HeaderChatList } from '../components/widgets/HeaderChatList/HeaderChatList';
import { SectionChatList } from '../components/widgets/SectionChatList/SectionChatList';
import { ContentFormForModal } from '../components/widgets/ContentFormForModal/ContentFormForModal';
import { useModal } from '../utils/hooks/useModal';

import PropTypes from 'prop-types';

export function ChatList({ setId }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <HeaderChatList />
      <main className="main">
        <SectionChatList openModal={openModal} setId={setId} />
      </main>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ContentFormForModal closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

ChatList.propTypes = {
  setId: PropTypes.func.isRequired,
};
