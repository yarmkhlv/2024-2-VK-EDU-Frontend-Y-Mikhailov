import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearTokens } from '../../../store/auth/slice';

import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './headerChatList.module.scss';

export function HeaderChatList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearTokens());
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    navigate('/', { replace: true });
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.content}>
          <div className={styles.leftBlock}>
            <Link
              to="/editprofile"
              className={styles.menuButton}
              aria-label="Кнопка перехода на страницу редактирования информации пользователя"
            >
              <MenuIcon sx={{ color: '#837d7d' }} />
            </Link>
          </div>
          <div className={styles.middleBlock}>
            <p className={styles.chatListText}>Список чатов</p>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.searchButtonBlock}>
              <button
                aria-label="Кнопка поиска по чатам"
                className={styles.searchButton}
              >
                <SearchIcon sx={{ color: '#837d7d' }} />
              </button>
            </div>
            <div className={styles.logoutButtonBlock}>
              <button
                aria-label="Кнопка выхода из аккаунта"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                <LogoutIcon sx={{ color: '#837d7d' }} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
