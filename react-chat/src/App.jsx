import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChatList } from './pages/ChatList';
import { Chat } from './pages/Chat';
import { Error } from './pages/Error';

import './App.css';
import { EditProfile } from './pages/EditProfile';

function App() {
  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];

  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Error />} />
        <Route path="/" element={<ChatList users={usersFromLocalStorage} />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;