import { fetchData } from './fetchData';
import { getFromCache, saveToCache, generateCacheKey } from './cache';
import { TranslateParams, TranslateResponse } from './types';

export const translate = async ({
    text,
    from = '',
    to,
    autoDetect = false,
}: TranslateParams): Promise<TranslateResponse> => {
    const cacheKey = generateCacheKey(text, from, to);
    const cachedResult = getFromCache(cacheKey);

    if (cachedResult) {
        return { translatedText: cachedResult };
    }

    try {
        const data = await fetchData<{
            responseData: { translatedText: string };
        }>(text, autoDetect ? '' : from, to, autoDetect);

        const translatedText = data.responseData.translatedText;

        saveToCache(cacheKey, translatedText);

        const translationHistory = JSON.parse(
            localStorage.getItem('translationHistory') || '[]',
        );
        const newHistoryItem = {
            fromLanguage: from || 'Autodetect',
            toLanguage: to,
            originalText: text,
            translatedText,
        };
        translationHistory.unshift(newHistoryItem);
        localStorage.setItem(
            'translationHistory',
            JSON.stringify(translationHistory),
        );

        return { translatedText };
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
};
