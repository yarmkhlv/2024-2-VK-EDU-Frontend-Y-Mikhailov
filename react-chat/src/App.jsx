import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChatList } from './pages/ChatList';
import { Chat } from './pages/Chat';
import { Error } from './pages/Error';

import './App.css';
import { EditProfile } from './pages/EditProfile';
import { CreateUser } from './pages/CreateUser';
import { Login } from './pages/Login';
import { AuthProvider } from './components/providers/AuthContextProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/" element={<Login />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
