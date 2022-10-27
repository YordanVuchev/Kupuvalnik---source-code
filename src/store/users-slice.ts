import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../Types/user.types';

interface IUsersState {
  users: IUser[];
  usersAvatars: {
    [index: string]: string;
  };
}

const usersInitialState: IUsersState = {
  users: [],
  usersAvatars: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },

    setUsersAvatars(state) {
      if (state.users) {
        state.usersAvatars = state.users.reduce<{ [index: string]: string }>(
          (acc, user: IUser) => {
            acc[user.username] = user.avatarUrl;
            return acc;
          },
          {}
        );
      }
    },

    updateUserAvatar(state, action) {
      state.usersAvatars[action.payload.username] = action.payload.Url;
    },
  },
});

export default usersSlice;
export const usersActions = usersSlice.actions;
