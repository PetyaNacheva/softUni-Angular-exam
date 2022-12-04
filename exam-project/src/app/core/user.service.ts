import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';
import { StorageService } from './storage.service';

export interface IUpdateUserDto extends Pick<IUser, 'username' | 'email'> {
  profilePicture?: File
}

export interface CreateUserDto { username: string, email: string, password: string }

@Injectable()
export class UserService {

  constructor(private storage: StorageService, private httpClient: HttpClient) {
    // console.log('UserService#constructor')
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
  }

  updateProfiles$(newUser: IUpdateUserDto): Observable<IUser> {
    const formData = new FormData();
    formData.set('username', newUser.username)
    formData.set('email', newUser.email)

    if(newUser.profilePicture){
      formData.append('profilePicture', newUser.profilePicture)
    }
    
    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, formData, {withCredentials: true})
  }
}

