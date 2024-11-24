import { useState } from 'react';
import { Modal } from '../components/shared/Modal/Modal';
import { HeaderChatList } from '../components/widgets/HeaderChatList/HeaderChatList';
import { SectionChatList } from '../components/widgets/SectionChatList/SectionChatList';
import { useModal } from '../utils/hooks/useModal';
import { CreatePrivateChat } from '../components/widgets/SectionChatList/ui/CreateChatWIndow/CreatePrivateChat';

export function ChatList() {
  const { isOpen, openModal, closeModal } = useModal();
  const [typeCreateChat, setTypeCreateChat] = useState('');

  const handleClickReturn = () => {
    setTypeCreateChat('');
    closeModal();
  };

  return (
    <>
      <HeaderChatList />
      <main className="main">
        <SectionChatList
          openModal={openModal}
          setTypeCreateChat={setTypeCreateChat}
        />
      </main>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          {typeCreateChat === 'privateChat' && (
            <CreatePrivateChat onClickReturn={handleClickReturn} />
          )}
        </Modal>
      )}
    </>
  );
}
