import { HashRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { ChatList } from './pages/ChatList';
import { Chat } from './pages/Chat';
import { Error } from './pages/Error';

import './App.css';
import { EditProfile } from './pages/EditProfile';
import { CreateUser } from './pages/CreateUser';
import { Login } from './pages/Login';
import { AuthIntervalRefreshProvider } from './components/providers/AuthIntervalRefreshProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './components/routes/PublicRoute';
import { PAGES } from './utils/variables';

function App() {
  return (
    <HashRouter>
      <AuthIntervalRefreshProvider>
        <Routes>
          <Route
            path={PAGES.LOGIN}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path={PAGES.CREATE_USER}
            element={
              <PublicRoute>
                <CreateUser />
              </PublicRoute>
            }
          />
          <Route
            path={PAGES.CHAT_LIST}
            element={
              <PrivateRoute>
                <ChatList />
              </PrivateRoute>
            }
          />
          <Route
            path={PAGES.EDIT_PROFILE}
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={PAGES.CHAT}
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path={PAGES.ERROR_PAGE} element={<Error />} />
        </Routes>
      </AuthIntervalRefreshProvider>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
