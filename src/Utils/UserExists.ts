import { getUserByUsername } from '../Service/user.service';

export const UserExists = async (username: string) => {
  const snapshot = await getUserByUsername(username);
  return snapshot.exists();
};
