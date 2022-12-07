import { IBase } from './base';
import { IUser } from './user';

export interface IMovie extends IBase {
    title:string;
    director:string;
    genre:string;
    releaseDate:string;
    poster: string,
    actors: string[];
    shortStory: string,
  likes: string[];
  comments: string[];
  userId: IUser;
}