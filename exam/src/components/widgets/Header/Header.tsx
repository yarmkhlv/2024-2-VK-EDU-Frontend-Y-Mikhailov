import styles from './header.module.scss';
import { Navigation } from './ui/Navigation';

export function Header() {
    return (
        <header className={styles.header}>
            <Navigation />
        </header>
    );
}
