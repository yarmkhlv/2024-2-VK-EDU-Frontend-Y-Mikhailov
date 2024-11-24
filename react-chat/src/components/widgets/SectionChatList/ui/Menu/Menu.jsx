import { useRef, useEffect } from 'react';
import styles from './menu.module.scss';

export function Menu({
  openModal,
  isOpenMenu,
  setIsOpenMenu,
  setTypeCreateChat,
}) {
  const menuRef = useRef(null);

  // const handleClickNewGeneralChat = () => {
  //   setTypeCreateChat('generalChat');
  //   setIsOpenMenu(false);
  //   openModal();
  // };
  const handleClickNewPrivateChat = () => {
    setTypeCreateChat('privateChat');
    setIsOpenMenu(false);
    openModal();
  };

  useEffect(() => {
    const root = document.getElementById('root');

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    };

    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
      root.style.pointerEvents = 'none';
      menuRef.current.style.pointerEvents = 'auto';
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.body.style.overflow = '';
      const root = document.getElementById('root');
      root.style.pointerEvents = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenMenu, setIsOpenMenu]);

  if (!isOpenMenu) return null;
  return (
    <div ref={menuRef} className={styles.menu}>
      <div className={styles.menuItem} onClick={() => {}}>
        <span style={{ color: 'gray' }}>Создание беседы(пока недоступно)</span>
      </div>
      <div className={styles.menuItem} onClick={handleClickNewPrivateChat}>
        Новый личный чат
      </div>
    </div>
  );
}
