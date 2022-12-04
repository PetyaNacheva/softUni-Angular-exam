import { IBase } from './base';
import { IPost } from './post';
import { IUser } from './user';


export interface IOffer<T = string> extends IBase {
    interested: string[];
    posts: T[];
    offerName: string;
    buyOrSell: string;
    cameraOrLens: string;
    offerPhoto: string;
    offerDescription: string;
    offerContact: string;
    userId: IUser;
  }