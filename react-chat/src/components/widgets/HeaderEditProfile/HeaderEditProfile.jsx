import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoneIcon from '@mui/icons-material/Done';
import clsx from 'clsx';

import styles from './headerEditProfile.module.scss';

export function HeaderEditProfile({
  title = 'Редактирование пользователя',
  navigateLink,
  saveProfile,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav
          className={clsx(styles.content, !saveProfile && styles.withoutBtn)}
        >
          <div className={styles.leftBlock}>
            <Link to={navigateLink || '/'} className={styles.returnButton}>
              <ArrowBackIosNewIcon sx={{ color: '#837d7d' }} />
            </Link>
          </div>
          <div className={styles.middleBlock}>
            <div className={styles.editProfileText}>{title}</div>
          </div>
          {/* <div className={styles.rightBlock}>
            <div className={styles.doneButtonBlock}>
              <button onClick={saveProfile} className={styles.doneButton}>
                <DoneIcon sx={{ color: '#837d7d' }} />
              </button>
            </div>
          </div> */}
        </nav>
      </div>
    </header>
  );
}
