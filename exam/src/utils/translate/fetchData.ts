export const fetchData = async <T>(
    text: string,
    from: string,
    to: string,
    autoDetect: boolean,
): Promise<T> => {
    const API_URL = 'https://api.mymemory.translated.net/get';

    const fromLang = autoDetect ? 'Autodetect' : from;

    const queryParams = new URLSearchParams({
        q: text,
        langpair: `${fromLang}|${to}`,
    }).toString();

    try {
        const response = await fetch(`${API_URL}?${queryParams}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
