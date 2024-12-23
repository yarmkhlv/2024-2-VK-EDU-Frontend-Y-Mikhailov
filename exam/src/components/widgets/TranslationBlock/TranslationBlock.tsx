import { useEffect, useState } from 'react';
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

    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
        null,
    );

    const handleChangeTextArea = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const text = e.target.value;
        dispatch(setTextToTranslate(text));

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            translateText(text);
        }, 1000);

        setDebounceTimer(timer);
    };

    const translateText = async (text: string) => {
        try {
            const result = await translate({
                text,
                from: fromLanguage,
                to: toLanguage,
                autoDetect: fromLanguage === 'Autodetect',
            });
            dispatch(setTranslatedText(result.translatedText));
        } catch (error) {
            console.error('Ошибка перевода:', error);
        }
    };

    useEffect(() => {
        if (textToTranslate && !debounceTimer) {
            translateText(textToTranslate);
        }
    }, [textToTranslate, fromLanguage, toLanguage, dispatch, debounceTimer]);

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
