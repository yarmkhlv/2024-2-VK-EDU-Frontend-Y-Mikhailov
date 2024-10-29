import { Modal } from '../components/shared/Modal/Modal';
import { HeaderChatList } from '../components/widgets/HeaderChatList/HeaderChatList';
import { SectionChatList } from '../components/widgets/SectionChatList/SectionChatList';
import { ContentFormForModal } from '../components/widgets/ContentFormForModal/ContentFormForModal';
import { useModal } from '../utils/hooks/useModal';

export function ChatList() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <HeaderChatList />
      <main className="main">
        <SectionChatList openModal={openModal} />
      </main>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ContentFormForModal closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}
