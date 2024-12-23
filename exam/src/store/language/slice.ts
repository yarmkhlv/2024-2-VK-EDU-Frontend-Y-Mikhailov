import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    fromLanguage: string;
    toLanguage: string;
}

const initialState: LanguageState = {
    fromLanguage: 'Autodetect',
    toLanguage: 'en-GB',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setFromLanguage(state, action: PayloadAction<string>) {
            state.fromLanguage = action.payload;
        },
        setToLanguage(state, action: PayloadAction<string>) {
            state.toLanguage = action.payload;
        },
        swapLanguages(state) {
            const temp = state.fromLanguage;
            state.fromLanguage = state.toLanguage;
            state.toLanguage = temp;
        },
    },
});

export const { setFromLanguage, setToLanguage, swapLanguages } =
    languageSlice.actions;
export default languageSlice.reducer;
