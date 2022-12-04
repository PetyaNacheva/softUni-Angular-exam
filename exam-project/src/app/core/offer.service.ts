import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOffer, IPost } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class OfferService {

  constructor(private http: HttpClient) { }

  addOffer$(body: { offerName: string, buyOrSell: string, 
    cameraOrLens: string, offerPhoto: File, offerDescription: string, offerContact: string }): Observable<IOffer> {
    console.log('this is body' + body)

    return this.http.post<IOffer>(`${apiUrl}/offers`, body, { withCredentials: true });
  }

  loadOfferById(id: string): Observable<IOffer<IPost>> {
    return this.http.get<IOffer<IPost>>(`${apiUrl}/offers/${id}`, {withCredentials: true})
  }

  loadOfferList(searchTerm: string = ''): Observable<IOffer[]> {
    return this.http.get<IOffer[]>(`${apiUrl}/offers?title=${searchTerm}`, {})
  }
}
