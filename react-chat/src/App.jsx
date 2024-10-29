import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatList } from './pages/ChatList';
import { Chat } from './pages/Chat';

import './App.css';
import { EditProfile } from './pages/EditProfile';

function App() {
  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatList users={usersFromLocalStorage} />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
