import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { 
  HttpClient, 
  HttpHeaders 
} from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpotifyAccessService {

  constructor(public http: HttpClient) { }

  getAuthToken() {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    let body = `grant_type=client_credentials&client_id=${environment.apiClientId}&client_secret=${environment.apiSecret}`;

    return this.http.post(
      environment.tokenURL, 
      body, 
      { headers }
    )
      .pipe(
        map((response: any) => {
          const token = response.access_token;
          return token;
        })
      );
  }
}
