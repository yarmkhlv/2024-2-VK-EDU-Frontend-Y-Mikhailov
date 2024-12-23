import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTextToTranslate,
    setTranslatedText,
} from '../../../store/translation/slice';
import { RootState } from '../../../store';
import { translate } from '../../../utils/translate';
import styles from './translationBlock.module.scss';

export function TranslationBlock() {
    const dispatch = useDispatch();
    const { textToTranslate, translatedText } = useSelector(
        (state: RootState) => state.translation,
    );
    const { fromLanguage, toLanguage } = useSelector(
        (state: RootState) => state.language,
    );

    const handleChangeTextArea = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const text = e.target.value;
        dispatch(setTextToTranslate(text));
    };

    useEffect(() => {
        if (textToTranslate) {
            const translateText = async () => {
                try {
                    const result = await translate({
                        text: textToTranslate,
                        from: fromLanguage,
                        to: toLanguage,
                        autoDetect: fromLanguage === 'Autodetect',
                    });
                    dispatch(setTranslatedText(result.translatedText));
                } catch (error) {
                    console.error('Ошибка перевода:', error);
                }
            };

            translateText();
        }
    }, [textToTranslate, fromLanguage, toLanguage, dispatch]);

    return (
        <div className={styles.translationBlock}>
            <textarea
                value={textToTranslate}
                onChange={handleChangeTextArea}
                className={styles.textarea}
                placeholder="Введите текст для перевода"
            />
            <div className={styles.resultBlock}>
                {translatedText || (
                    <span className={styles.resultPlaceholder}>Перевод</span>
                )}
            </div>
        </div>
    );
}
