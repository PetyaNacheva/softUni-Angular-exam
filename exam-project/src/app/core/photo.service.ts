import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPost,  } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPhoto } from './interfaces/photo';

const apiUrl = environment.apiUrl;

export interface PaginatedResponse<T> {
  results: T[];
  totalResults: number;
}

@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  addPhoto$(body: { photoTitle: string, photoUrl: string, photoExif: string }): Observable<IPhoto> {
    //console.log('this is body' + body)
    return this.http.post<IPhoto>(`${apiUrl}/photos`, body, { withCredentials: true });
  }

  loadPhotoList(searchTerm: string = ''): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(`${apiUrl}/photos?title=${searchTerm}`, {})
  }

  loadPhotoPaginatedList(searchTerm: string = '', startIndex: number, limit: number): Observable<PaginatedResponse<IPhoto>> {
    return this.http.get<PaginatedResponse<IPhoto>>(`${apiUrl}/photos/list`, {
      params: new HttpParams({
        fromObject: {
          title: searchTerm,
          startIndex,
          limit
        }
      })
    })
  }

  loadTopPhotoList(): Observable<IPhoto[]>{
    return this.http.get<IPhoto[]>(`${apiUrl}/photos/top`)
  }

  loadPhotoById(id: string): Observable<IPhoto<IPost, string>> {
    return this.http.get<IPhoto<IPost, string>>(`${apiUrl}/photos/${id}`, {withCredentials: true})
  }

  subscribeToPhoto(photoId: string): Observable<IPhoto>{
    return this.http.put<IPhoto>(`${apiUrl}/photos/${photoId}`, {}, {withCredentials: true})
  }

  unsubscribeToPhoto(photoId: string): Observable<IPhoto>{
    return this.http.put<IPhoto>(`${apiUrl}/photos/${photoId}/unsubscribe`, {}, {withCredentials: true})
  }

  deletePhotoItem(id: string): Observable<IPhoto<IPost, string>> {
    return this.http.delete<IPhoto<IPost, string>>(`${apiUrl}/photos/${id}`, {withCredentials: true})
  }


}
