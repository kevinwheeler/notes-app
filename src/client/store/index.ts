import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const wrapper = createWrapper(makeStore);
