export interface IRegisterCredentials {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdOn: string;
  favorites: [];
  ads: [];
  avatarUrl: string;
}
