import { NavLink } from 'react-router-dom';

import styles from './navigation.module.scss';

import { NAV_DATA_ITEMS } from './variables';
import clsx from 'clsx';

export function Navigation() {
    const renderNavElements = NAV_DATA_ITEMS.map(({ text, link }, i) => (
        <li key={i} className={styles.item}>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? clsx(styles.baseLink, styles.activeLink)
                        : styles.baseLink
                }
                to={link}
            >
                {text}
            </NavLink>
        </li>
    ));
    return (
        <nav className={styles.nav}>
            <ul className={styles.listItems}>{renderNavElements}</ul>
        </nav>
    );
}
