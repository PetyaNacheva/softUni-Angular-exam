import { IBase } from './base';

export interface IUser extends IBase {
  photos: string[]
  posts: string[];
  tel: string;
  email: string;
  username: string;
  password: string;
  profilePicture?: string
}
