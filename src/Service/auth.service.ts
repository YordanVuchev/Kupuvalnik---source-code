import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../Config/firebase-config';

export const registerUser = async ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(auth.currentUser!, { displayName: username });

  return res;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

export const logout = async () => {
  const res = await signOut(auth);
  return res;
};

export const updateUserEmail = (email: string) => {
  return updateEmail(auth.currentUser!, email);
};
export const updateUserPassword = (password: string) => {
  return updatePassword(auth.currentUser!, password);
};

export const updateUserEmailWithReAuthentication = async (
  oldEmail: string,
  password: string,
  newEmail: string
) => {
  const authentication = await signInWithEmailAndPassword(
    auth,
    oldEmail,
    password
  );
  return updateEmail(authentication.user, newEmail);
};

export const updateUserPassWordWithReAuthentication = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const authentication = await signInWithEmailAndPassword(
    auth,
    email,
    oldPassword
  );
  return updatePassword(authentication.user, newPassword);
};
