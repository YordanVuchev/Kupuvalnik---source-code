import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../Types/user.types';

interface IAuthState {
  isLoggedIn: boolean;
  userData: IUser | null;
}

const authInitialState: IAuthState = {
  isLoggedIn: false,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
