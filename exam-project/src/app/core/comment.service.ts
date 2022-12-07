import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment$(text: string, id: string): Observable<IComment> {
    // console.log(text)
    return this.http.post<IComment>(`${apiUrl}/movies/${id}`, { text }, { withCredentials: true });
  }

  likeComment(movieId: string, commentId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${apiUrl}/movies/${movieId}/comments/${commentId}/like`, {}, { withCredentials: true });
  }

  dislikeComment(movieId: string, commentId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${apiUrl}/movies/${movieId}/comments/${commentId}/dislike`, {}, { withCredentials: true });
  }
}