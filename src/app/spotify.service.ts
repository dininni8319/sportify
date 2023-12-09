import { Injectable } from '@angular/core';
import { 
  HttpClient, 
  HttpHeaders, 
  HttpParams 
} from "@angular/common/http";
import { switchMap, catchError, tap } from 'rxjs/operators'
import { environment } from '../environments/environment';
import { SpotifyAccessService } from './spotify-access.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  constructor(
    public http: HttpClient,
    public spotifyAccess: SpotifyAccessService
  ) {
    // Call the getAuthToken method when the service is instantiated
    this.handleAccessToken();
  }
  
  private handleAccessToken() {
    // Use switchMap to switch to the new observable returned by getAuthToken
    return this.spotifyAccess.getAuthToken().pipe(
      catchError((error) => {
        console.error('Error retrieving access token:', error);
        throw error; // Rethrow the error to propagate it to subscribers
      }),
      tap((token) => console.log('Access token retrieved successfully:', token))
    );
  }

  private queryWithToken(URL: string, params?: Array<string>) {
    return this.handleAccessToken().pipe(
      switchMap((token) => {
        const headers: HttpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        const queryParams:{ [param: string]: string | number | boolean | readonly (string | number | boolean)[] } = {};
        if (params) {
          params.forEach((param) => {
            const [key, value] = param.split('=');
            queryParams[key] = value;
          });
        }

        const options = {
          headers,
          params: new HttpParams({ fromObject: queryParams }),
        };

        return this.http.get(`${environment.apiUrl}${URL}`, options);
      }),
      catchError((error) => {
        console.error('Error in API query:', error);
        throw error; // Rethrow the error to propagate it to subscribers
      })
    );
  }
  
  search(query: string, type: string) {
    return this.queryWithToken('/search', [
      `q=${query}`,
      `type=${type}`
    ]);
  }
  
  searchTrack(query: string) {
    return this.search(query, 'track');
  }

  getTrack(id: string) {
    return this.queryWithToken(`/tracks/${id}`);
  }

  getArtist(id: string) {
    return this.queryWithToken(`/artists/${id}`);
  }

  getAlbum(id: string) {
    return this.queryWithToken(`/albums/${id}`);
  }
}
