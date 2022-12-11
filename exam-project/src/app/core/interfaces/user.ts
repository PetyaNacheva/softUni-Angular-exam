import { IBase } from './base';

export interface IUser extends IBase {


  movies: string[];
  comments: string[];
  email: string;
  username: string;
  password: string;
}
