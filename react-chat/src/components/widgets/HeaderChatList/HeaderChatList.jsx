import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import styles from './headerChatList.module.scss';

export function HeaderChatList() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.content}>
          <div className={styles.leftBlock}>
            <button className={styles.menuButton}>
              <MenuIcon sx={{ color: '#837d7d' }} />
            </button>
          </div>
          <div className={styles.middleBlock}>
            <p className={styles.chatListText}>Список чатов</p>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.searchButtonBlock}>
              <button className={styles.searchButton}>
                <SearchIcon sx={{ color: '#837d7d' }} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
