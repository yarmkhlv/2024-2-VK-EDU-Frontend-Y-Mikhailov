import { useDispatch, useSelector } from 'react-redux';
import {
    setFromLanguage,
    setToLanguage,
    swapLanguages,
} from '../../../store/language/slice';
import styles from './languageOptions.module.scss';
import clsx from 'clsx';
import languages from '../../../utils/languages/languages.json';
import { SwapBtn } from './ui/SwapBtn';
import { RootState } from '../../../store';
import {
    setTextToTranslate,
    setTranslatedText,
} from '../../../store/translation/slice';

export function LanguageOptions() {
    const dispatch = useDispatch();
    const { fromLanguage, toLanguage } = useSelector(
        (state: RootState) => state.language,
    );
    const { textToTranslate, translatedText } = useSelector(
        (state: RootState) => state.translation,
    );

    const popularLanguages = ['Autodetect', 'ru-RU', 'en-GB', 'de-DE'];
    const otherLanguages = Object.keys(languages).filter(
        (key) => !popularLanguages.includes(key),
    );

    const handleClickSwapBtn = () => {
        dispatch(swapLanguages());
        dispatch(setTextToTranslate(translatedText));
        dispatch(setTranslatedText(textToTranslate));
    };

    const handleClickPopularLanguage = (item: string, isFrom: boolean) => {
        if (isFrom) {
            if (item === toLanguage) {
                dispatch(swapLanguages());
                dispatch(setTextToTranslate(translatedText));
                dispatch(setTranslatedText(textToTranslate));
            } else {
                dispatch(setFromLanguage(item));
            }
        } else {
            if (item === fromLanguage) {
                dispatch(swapLanguages());
                dispatch(setTextToTranslate(translatedText));
                dispatch(setTranslatedText(textToTranslate));
            } else {
                dispatch(setToLanguage(item));
            }
        }
    };

    const handleSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        isFrom: boolean,
    ) => {
        const selectedLanguage = e.target.value;

        if (isFrom) {
            if (selectedLanguage === toLanguage) {
                handleClickSwapBtn();
            } else {
                dispatch(setFromLanguage(selectedLanguage));
            }
        } else {
            if (selectedLanguage === fromLanguage) {
                handleClickSwapBtn();
            } else {
                dispatch(setToLanguage(selectedLanguage));
            }
        }
    };

    const renderLanguages = (selectedLanguage: string, isFrom: boolean) => {
        const filteredPopularLanguages = isFrom
            ? popularLanguages
            : popularLanguages.filter((lang) => lang !== 'Autodetect');

        return (
            <>
                <ul className={styles.listLanguage}>
                    {filteredPopularLanguages.map((item) => (
                        <li
                            onClick={() =>
                                handleClickPopularLanguage(item, isFrom)
                            }
                            key={item}
                            className={clsx(
                                styles.item,
                                item === selectedLanguage && styles.activeItem,
                            )}
                        >
                            {languages[item as keyof typeof languages]}
                        </li>
                    ))}
                </ul>
                <select
                    value={selectedLanguage}
                    onChange={(e) => handleSelectChange(e, isFrom)}
                    className={clsx(
                        styles.select,
                        otherLanguages.includes(selectedLanguage) &&
                            styles.activeSelect,
                    )}
                >
                    {otherLanguages.map((item) => (
                        <option
                            key={item}
                            value={item}
                            className={
                                selectedLanguage === item
                                    ? styles.selectedOption
                                    : ''
                            }
                        >
                            {languages[item as keyof typeof languages]}
                        </option>
                    ))}
                </select>
            </>
        );
    };

    return (
        <div className={styles.languageOptions}>
            <div className={styles.fromBlock}>
                {renderLanguages(fromLanguage, true)}
            </div>
            <div className={styles.swapBlock}>
                {!(fromLanguage === 'Autodetect') && (
                    <SwapBtn
                        className={clsx(styles.swapBtn, styles.swapBtnDisabled)}
                        onClick={handleClickSwapBtn}
                    />
                )}
            </div>
            <div className={styles.toBlock}>
                {renderLanguages(toLanguage, false)}
            </div>
        </div>
    );
}
