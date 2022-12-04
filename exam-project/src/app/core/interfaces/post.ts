import { IPhoto } from '.';
import { IBase } from './base';
import { IUser } from './user';

export interface IPost extends IBase {
  likes: string[];
  text: string;
  userId: IUser;
  photoId: IPhoto
}
