import styles from './userItem.module.scss';

export function UserItem({
  username,
  first_name,
  last_name,
  avatar,
  handleClickUser,
}) {
  const fullName = `${first_name} ${last_name}`;

  return (
    <div className={styles.user} onClick={handleClickUser}>
      <div className={styles.avatar}>
        {avatar ? (
          <img className={styles.userImg} src={avatar} alt="Изображение чата" />
        ) : (
          <span className={styles.initials}>
            {first_name[0] + last_name[0]}
          </span>
        )}
      </div>

      <div className={styles.userInfo}>
        <div className={styles.fullname}>{fullName}</div>
        <div className={styles.username}>{username}</div>
      </div>
    </div>
  );
}
