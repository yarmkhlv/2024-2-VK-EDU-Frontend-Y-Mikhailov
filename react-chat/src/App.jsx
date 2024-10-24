import { useState } from 'react';
import { ChatList } from './pages/ChatList';
import { Chat } from './pages/Chat';

import './App.css';

function App() {
  const [currentSelectedId, setCurrentSelectedId] = useState(null);
  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];
  const findedUser = usersFromLocalStorage.find(
    (user) => user.id === currentSelectedId
  );

  const handleReturnToList = () => {
    setCurrentSelectedId(null);
  };

  return (
    <>
      {findedUser ? (
        <Chat user={findedUser} onClickReturn={handleReturnToList} />
      ) : (
        <ChatList setId={setCurrentSelectedId} users={usersFromLocalStorage} />
      )}
    </>
  );
}

export default App;
