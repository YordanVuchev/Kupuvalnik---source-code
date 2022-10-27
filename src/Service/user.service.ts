import {
  set,
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  update,
} from 'firebase/database';
import { db } from '../Config/firebase-config';

export const createUser = (
  {
    firstName,
    lastName,
    username,
    password,
    email,
  }: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
  },
  userId: string
) => {
  return set(ref(db, `users/${userId}`), {
    id: userId,
    firstName,
    lastName,
    username,
    password,
    email,
    createdOn: new Date().toLocaleString('en-US'),
    ads: [],
    favorites: [],
    avatarUrl: '',
  });
};

export const getUserByUsername = async (username: string) => {
  return await get(
    query(ref(db, 'users'), orderByChild('username'), equalTo(username))
  );
};

export const getUserData = (uid: string) => {
  return get(ref(db, `users/${uid}`));
};

export const updateUserAvatarUrl = (userId: string, avatarUrl: string) => {
  return update(ref(db), {
    [`users/${userId}/avatarUrl`]: avatarUrl,
  });
};

export const updateUserProperty = (
  userId: string,
  property: string,
  name: string
) => {
  return update(ref(db), {
    [`users/${userId}/${property}`]: name,
  });
};

export const getAllUsers = () => {
  return get(ref(db, `users`));
};
