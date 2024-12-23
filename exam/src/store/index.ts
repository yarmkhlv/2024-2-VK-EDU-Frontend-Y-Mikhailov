import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/slice';
import translationReducer from './translation/slice';

const store = configureStore({
    reducer: {
        language: languageReducer,
        translation: translationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
