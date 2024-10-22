import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';

import styles from './headerChat.module.scss';

export function HeaderChat({ avatarUrl, userName, onClickReturn }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.content}>
          <div className={styles.leftBlock}>
            <button onClick={onClickReturn} className={styles.returnButton}>
              <ArrowBackIosIcon sx={{ color: '#837d7d' }} />
            </button>
          </div>
          <div className={styles.middleBlock}>
            <img className={styles.userLogo} src={avatarUrl} />
            <div className={styles.infoUser}>
              <div className={styles.userFio}>{userName}</div>
              <div className={styles.userEntrytime}>В сети</div>
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

HeaderChat.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onClickReturn: PropTypes.func.isRequired,
};
