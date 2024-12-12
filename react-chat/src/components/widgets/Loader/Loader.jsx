import styles from './loader.module.scss';

export function Loader(isLoading) {
  if (!isLoading) {
    return null;
  }
  return <div className={styles.loader} />;
}
