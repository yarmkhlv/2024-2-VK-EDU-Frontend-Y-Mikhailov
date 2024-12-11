import { useState, useRef, useId } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Modal } from '../../shared/Modal/Modal';
import styles from './sectionInput.module.scss';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MapIcon from '@mui/icons-material/Map';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import { rejectToast } from '../../../utils/toastes/toastes';
import { generateTitleModalHeader } from './helpers/generateTitleModalHeader';

const API_URL = import.meta.env.VITE_API_URL;

const modalClasses = {
  additionalModalOverlay: styles.additionalModalOverlay,
  additionalModalContent: styles.additionalModalContent,
};

const INVALID_CREATE_TOKEN_ERROR = `Ошибка в создании токена`;

export function SectionInput({ id, selectedImages, setSelectedImages }) {
  const navigate = useNavigate();
  const geolocation = navigator.geolocation;
  const { accessToken, refreshAccessToken } = useSelector(
    (state) => state.auth
  );

  const inputImageId = useId();

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [inputValue, setInputValue] = useState('');
  const [inputValueAtPreview, setInputValueAtPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isOpenAttachData, setIsOpenAttachData] = useState(false);

  const handleClickAttachBtn = () => {
    setIsOpenAttachData((prev) => !prev);
  };

  function getPosSuccess(pos) {
    const position = pos.coords;
    setInputValue(
      `https://www.openstreetmap.org/#map=18/${position.latitude}/${position.longitude}`
    );
  }
  function getPosReject(err) {
    rejectToast(err.message);
  }
  const handleClickGeoBtn = () => {
    if (!geolocation) {
      rejectToast('Ваш браузер не поддерживает отправку геопозиции');
      return;
    }
    geolocation.getCurrentPosition(getPosSuccess, getPosReject);
    setIsOpenAttachData(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      rejectToast('Можно загрузить не больше 5 файлов');
      setIsOpenAttachData(false);
      return;
    }

    const previews = files.map((file) => {
      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    });

    setSelectedImages(previews);
    setIsOpenAttachData(false);
  };

  const closePreviewImages = () => {
    setSelectedImages([]);
    setInputValueAtPreview('');
  };

  const handleRemoveImg = (name) => {
    setSelectedImages((prev) => prev.filter((el) => el.file.name !== name));
  };

  const handleSubmitImages = async (e, retryCount = 1) => {
    e.preventDefault();
    if (isLoading || !retryCount) return;
    if (selectedImages.length < 1) {
      rejectToast('Нет изображений для отправки');
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      selectedImages.forEach((item) => {
        formData.append('files', item.file);
      });
      formData.append('chat', id);

      if (inputValueAtPreview) {
        formData.append('text', inputValueAtPreview);
      }

      const response = await fetch(`${API_URL}/messages/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            return handleSubmit(e, retryCount - 1);
          } else {
            throw new Error(INVALID_CREATE_TOKEN_ERROR);
          }
        } else throw new Error(`Ошибка ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (error.message === INVALID_CREATE_TOKEN_ERROR) {
        navigate('/');
      } else {
        rejectToast('Не удалось отправить сообщение');
      }
    } finally {
      setSelectedImages([]);
      setInputValueAtPreview('');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e, retryCount = 1) => {
    e.preventDefault();
    if (isLoading || !retryCount) return;
    setIsLoading(true);

    try {
      const trimmedText = inputValue.trim();

      if (!trimmedText) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text: trimmedText,
          chat: id,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            return handleSubmit(e, retryCount - 1);
          } else {
            throw new Error(`Ошибка в создании токена`);
          }
        } else throw new Error(`Ошибка ${response.status}`);
      } else {
        setInputValue('');
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (error.message === INVALID_CREATE_TOKEN_ERROR) {
        navigate('/');
      } else {
        rejectToast('Не удалось отправить сообщение');
      }
    } finally {
      setInputValue('');
      setIsLoading(false);
    }
  };

  const handleSubmitVoice = async (e, retryCount = 1) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      stopRecording();

      mediaRecorderRef.current.onstop = async () => {
        const chunks = audioChunksRef.current;

        if (chunks.length === 0) {
          rejectToast(
            'Не удалось записать голосовое сообщение. Попробуйте снова.'
          );
          return;
        }

        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', {
          type: 'audio/wav',
        });

        const formData = new FormData();
        formData.append('chat', id);
        formData.append('voice', audioFile);

        const response = await fetch(`${API_URL}/messages/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (!response.ok) {
          if (response.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              return handleSubmitVoice(e, retryCount - 1); // Перезапуск запроса
            } else {
              throw new Error('Ошибка в создании токена');
            }
          } else throw new Error(`Ошибка ${response.status}`);
        } else {
          audioChunksRef.current = [];
        }
      };
    } catch (error) {
      console.error('Error:', error.message);
      rejectToast('Не удалось отправить голосовое сообщение.');
    } finally {
      setIsRecording(false);
      setIsLoading(false);
    }
  };

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      rejectToast('Ваш браузер не поддерживает запись аудио');
      return;
    }

    try {
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (e) {
      console.error(e, 'Ошибка при');
      rejectToast('Ошибка при попытке записи');
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();

    if (mediaRecorderRef.current.stream) {
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  const handleDeleteRecording = () => {
    stopRecording();
    audioChunksRef.current = [];
    setIsRecording(false);
  };

  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <form
          onSubmit={isRecording ? handleSubmitVoice : handleSubmit}
          className={styles.form}
          action="/"
        >
          <div
            className={clsx(
              styles.inputContainer,
              isRecording && styles.recordingProcess
            )}
          >
            <input
              className={clsx(
                styles.input,
                isRecording && styles.inputDisabled
              )}
              disabled={isRecording}
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              name="message-text"
              placeholder="Введите сообщение"
              type="text"
              autoFocus
              autoComplete="off"
            />
            {isOpenAttachData && !isRecording && (
              <div className={styles.attachData}>
                <div
                  type="button"
                  onClick={handleClickGeoBtn}
                  className={styles.attachItem}
                >
                  <MapIcon sx={{ color: '#837d7d' }} />
                  Геопозиция
                </div>
                <label htmlFor={inputImageId} className={styles.attachItem}>
                  <ImageIcon sx={{ color: '#837d7d' }} />
                  Изображение
                  <input
                    id={inputImageId}
                    className={styles.imageInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              </div>
            )}
            {!isRecording && (
              <button
                type="button"
                onClick={handleClickAttachBtn}
                className={styles.attachBtn}
              >
                <AttachFileIcon sx={{ color: '#837d7d' }} />
              </button>
            )}
          </div>
          <div className={styles.btnsProcessRecorderContainer}>
            {isRecording && (
              <button
                type="button"
                onClick={handleDeleteRecording}
                className={styles.delBtn}
              >
                <DeleteOutlineIcon sx={{ color: '#837d7d' }} />
              </button>
            )}
            {isRecording || inputValue.length > 0 ? (
              <button type="submit" className={styles.submitBtn}>
                <SendIcon sx={{ color: '#837d7d' }} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartRecording}
                className={styles.voiceBtn}
              >
                <MicIcon sx={{ color: '#837d7d' }} />
              </button>
            )}
          </div>
        </form>
      </div>
      <Modal isOpen={selectedImages.length > 0} classes={modalClasses}>
        <div className={styles.modalHeader}>
          <button
            className={styles.closeBtn}
            type="button"
            onClick={closePreviewImages}
          >
            <CloseIcon sx={{ color: '#837d7d' }} />
          </button>
          {generateTitleModalHeader(selectedImages.length)}
          <button
            className={styles.doneBtn}
            type="button"
            onClick={handleSubmitImages}
          >
            <DoneIcon sx={{ color: '#837d7d' }} />
          </button>
        </div>
        <div className={styles.modalBody}>
          {selectedImages.map((img) => (
            <div key={img.file.name} className={styles.item}>
              <img src={img.previewUrl} className={styles.img} alt="Preview" />
              <button
                type="button"
                onClick={() => handleRemoveImg(img.file.name)}
                className={styles.removeImageBtn}
              >
                <DeleteOutlineIcon />
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            className={styles.inputAtPreviewMessage}
            value={inputValueAtPreview}
            onChange={(e) => setInputValueAtPreview(e.currentTarget.value)}
            name="message-text-at-preview"
            placeholder="Введите сообщение"
            type="text"
            autoComplete="off"
          />
        </div>
      </Modal>
    </section>
  );
}
