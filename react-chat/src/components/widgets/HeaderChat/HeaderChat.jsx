import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import styles from './headerChat.module.scss';

export function HeaderChat({ avatar, title, is_private }) {
  const avatarInitials = (() => {
    if (!title) return '';
    return is_private
      ? title
          .split(' ')
          .map((el) => el[0])
          .join('')
      : title[0];
  })();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.content}>
          <div className={styles.leftBlock}>
            <Link to="/chatlist" className={styles.returnButton}>
              <ArrowBackIosNewIcon sx={{ color: '#837d7d' }} />
            </Link>
          </div>
          <div className={styles.middleBlock}>
            <div className={styles.avatar}>
              {avatar ? (
                <img
                  className={styles.userImg}
                  src={avatar}
                  alt="Изображение чата"
                />
              ) : (
                <span className={styles.initials}>{avatarInitials}</span>
              )}
            </div>
            <div className={styles.infoUser}>
              <div className={styles.title}>{title}</div>
            </div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.searchButtonBlock}>
              <button className={styles.searchButton}>
                <SearchIcon sx={{ color: '#837d7d' }} />
              </button>
            </div>
            <div className={styles.paramsButtonBlock}>
              <button className={styles.paramsButton}>
                <MoreVertIcon sx={{ color: '#837d7d' }} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
