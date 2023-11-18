import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { switchMap } from 'rxjs/operators'
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
    this.getAuthToken();
  }
  
  private getAuthToken() {
    // Use switchMap to switch to the new observable returned by getAuthToken
    this.spotifyAccess.getAuthToken().pipe(
      switchMap((token) => {
        // Set the access token and return an observable
        this.spotifyAccess.setAccessToken(token);
        return Observable.create(); // This can be replaced with an observable if needed
      })
    ).subscribe(
      () => console.log('Access token retrieved successfully.'),
      (error) => console.error('Error retrieving access token:', error)
    );
  }

  private getAccessToken() {
    return this.spotifyAccess.getAuthToken();
  }

  private query(URL: string, params?: Array<string>) {
    let queryURL = `${environment.apiUrl}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join("&")}`;
    }

    return this.getAccessToken().pipe(
      switchMap((token) => {
        let headers: HttpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get(queryURL, { headers });
      })
    );
  }
  
  search(query: string, type: string) {
    return this.query('/search', [
      `q=${query}`,
      `type=${type}`
    ]);
  }
  
  searchTrack(query: string) {
    return this.search(query, 'track');
  }

  getTrack(id: string) {
    return this.query(`/tracks/${id}`);
  }
}
