import { useRef, useState } from 'react';
import clsx from 'clsx';
import { LazyImage } from '../../../../shared/LazyImage/LazyImage';
import { convertDate } from '../../../../../utils/convertDate';
import styles from './privateMessage.module.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export function PrivateMessage({ currentUserId, messageData }) {
  const { sender, text, voice, files, created_at } = messageData;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={clsx(
        styles.message,
        currentUserId === sender.id
          ? styles.ownMessage
          : styles.anotherPersonsMessage,
        styles.newMessage
      )}
    >
      {voice ? (
        <div className={styles.audioContainer}>
          <audio
            ref={audioRef}
            onEnded={handleAudioEnd}
            preload="metadata"
            src={voice}
          />
          <button type="button" onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon sx={{ color: '#837d7d' }} />
            ) : (
              <PlayArrowIcon sx={{ color: '#837d7d' }} />
            )}
          </button>
        </div>
      ) : files.length > 0 ? (
        <div className={styles.imgContainer}>
          {files.map((el, i) => (
            <LazyImage
              alt="изображение из сообщения"
              className={styles.img}
              key={i}
              src={el.item}
            />
          ))}
          {text}
        </div>
      ) : (
        text
      )}
      <span className={styles.timeMessage}>{convertDate(created_at)}</span>
    </div>
  );
}
