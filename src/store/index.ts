import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authSlice from './auth-slice';
import adsSlice from './ads-slice';
import usersSlice from './users-slice';
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ads: adsSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
// export const
export default store;
export type RootState = ReturnType<typeof store.getState>;
