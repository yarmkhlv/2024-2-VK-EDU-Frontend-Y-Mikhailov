import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoneIcon from '@mui/icons-material/Done';

import styles from './headerEditProfile.module.scss';

export function HeaderEditProfile({ saveProfile }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.content}>
          <div className={styles.leftBlock}>
            <Link to="/" className={styles.returnButton}>
              <ArrowBackIosNewIcon sx={{ color: '#837d7d' }} />
            </Link>
          </div>
          <div className={styles.middleBlock}>
            <div className={styles.editProfileText}>
              Редактирование пользователя
            </div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.doneButtonBlock}>
              <button onClick={saveProfile} className={styles.doneButton}>
                <DoneIcon sx={{ color: '#837d7d' }} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

HeaderEditProfile.propTypes = {
  saveProfile: PropTypes.func.isRequired,
};
