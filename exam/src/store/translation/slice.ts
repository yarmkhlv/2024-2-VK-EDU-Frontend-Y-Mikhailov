import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TranslationState {
    textToTranslate: string;
    translatedText: string;
}

const initialState: TranslationState = {
    textToTranslate: '',
    translatedText: '',
};

const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {
        setTextToTranslate(state, action: PayloadAction<string>) {
            state.textToTranslate = action.payload;
        },
        setTranslatedText(state, action: PayloadAction<string>) {
            state.translatedText = action.payload;
        },
    },
});

export const { setTextToTranslate, setTranslatedText } =
    translationSlice.actions;
export default translationSlice.reducer;
