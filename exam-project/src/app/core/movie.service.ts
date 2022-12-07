import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from './interfaces';

const apiUrl = environment.apiUrl;

export interface CreateMovieDto {
//   recipeName: string, ingredients: string[], description: string
}

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

  loadMovieList(searchTerm: string = ""): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(
      `${apiUrl}/movies?title=${searchTerm}`, { params: new HttpParams({ fromObject: {} }) });
  }

  loadMovieById(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(`${apiUrl}/movies/${id}`);
  }

  loadMostLiked$(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${apiUrl}/movies/likes`);
  }

  loadMostComment$(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${apiUrl}/movies/comments`);
  }

  addMovie$(body: CreateMovieDto): Observable<IMovie> {
    return this.http.post<IMovie>(`${apiUrl}/movies`, body, { withCredentials: true });
  }

  getAllMoviesByUser$(userId: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${apiUrl}/users/profile/${userId}`, { withCredentials: true });
  }

  getAllLikedByUser$(userId: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${apiUrl}/users/profile/${userId}/liked`, { withCredentials: true });
  }

  updateMovie$(id: string, body: CreateMovieDto): Observable<IMovie> {
    return this.http.put<IMovie>(`${apiUrl}/movies/${id}/edit`, body, { withCredentials: true });
  }

  deleteMovie(id: string) {
    return this.http.delete(`${apiUrl}/movies/${id}`, { withCredentials: true });
  }

  likeMovie(movieId: string): Observable<IMovie> {
    return this.http.put<IMovie>(`${apiUrl}/movies/${movieId}/like`, {}, { withCredentials: true });
  }

  dislikeMovie(movieId: string): Observable<IMovie> {
    return this.http.put<IMovie>(`${apiUrl}/movies/${movieId}/dislike`, {}, { withCredentials: true });
  }
}