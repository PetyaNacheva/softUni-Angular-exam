import { IBase } from './base';
import { IMovie } from './movie';
import { IUser } from './user';

export interface IComment extends IBase {
  likes: string[];
  text: string;
  userId: IUser;
  movieId: IMovie;
}