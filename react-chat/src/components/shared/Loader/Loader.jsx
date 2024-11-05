import * as styles from './loader.module.scss';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export const Loader = ({ status }) => {
  if (!status) return null;
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}>
        {status === 'loading' && <div className={styles.spinner} />}
        {status === 'done' && (
          <TaskAltIcon sx={{ width: '40px', height: '40px' }} />
        )}
        {status === 'reject' && (
          <ThumbDownIcon sx={{ width: '40px', height: '40px' }} />
        )}
      </div>
    </div>
  );
};
