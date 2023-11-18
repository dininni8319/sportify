import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpotifyAccessService {

  constructor(public http: HttpClient) { }

  setAccessToken(token: string) {
    // Store the token in a more secure way (e.g., Angular service property) based on your application's needs.
    // localStorage.setItem("token", token);
    // Consider using a service property to store the token instead of localStorage.
  }

  getAuthToken() {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    let body = `grant_type=client_credentials&client_id=${environment.apiClientId}&client_secret=${environment.apiSecret}`;

    return this.http.post(environment.tokenURL, body, { headers })
      .pipe(
        map((response: any) => {
          const token = response.access_token;
          this.setAccessToken(token);
          return token;
        })
      );
  }
}
