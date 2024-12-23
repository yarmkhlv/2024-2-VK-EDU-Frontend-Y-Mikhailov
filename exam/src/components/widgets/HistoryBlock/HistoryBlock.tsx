import styles from './historyBlock.module.scss';

interface ITranslationHistoryItem {
    fromLanguage: string;
    toLanguage: string;
    originalText: string;
    translatedText: string;
}

export function HistoryBlock() {
    const translationHistory: ITranslationHistoryItem[] = JSON.parse(
        localStorage.getItem('translationHistory') || '[]',
    );

    const clearHistory = () => {
        localStorage.removeItem('translationHistory');
        window.location.reload();
    };

    return (
        <div className={styles.historyBlock}>
            <h2 className={styles.historyTitle}>История переводов</h2>
            <div className={styles.historyList}>
                {translationHistory.length === 0 ? (
                    <p>История переводов пуста.</p>
                ) : (
                    translationHistory.map((item, index) => (
                        <div key={index} className={styles.historyItem}>
                            <div className={styles.choosedLanguages}>
                                <div className={styles.lang}>
                                    {item.fromLanguage}
                                </div>
                                <div className={styles.arrow}>→</div>
                                <div className={styles.lang}>
                                    {item.toLanguage}
                                </div>
                            </div>
                            <div className={styles.translatedTexts}>
                                <div className={styles.fromValue}>
                                    {item.originalText}
                                </div>
                                <div className={styles.toValue}>
                                    {item.translatedText}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                className={styles.clearHistoryButton}
                onClick={clearHistory}
            >
                Очистить историю
            </button>
        </div>
    );
}
