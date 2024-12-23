export type TranslateParams = {
    text: string;
    from?: string;
    to: string;
    autoDetect?: boolean;
};

export type TranslateResponse = {
    translatedText: string;
    detectedSourceLanguage?: string;
};

export type TranslateError = {
    code: number;
    message: string;
};
