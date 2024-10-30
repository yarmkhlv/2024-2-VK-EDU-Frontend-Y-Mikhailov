import { Link } from 'react-router-dom';
import styles from './sectionError.module.scss';

export function SectionError() {
  return (
    <section className={styles.section}>
      <div className={styles.errorText}>
        К сожалению, не удалось найти страницу по запрашиваемому адресу
      </div>
      <Link to="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </section>
  );
}
