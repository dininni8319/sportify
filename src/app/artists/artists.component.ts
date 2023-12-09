import { 
  Component, 
  OnInit 
} from '@angular/core';
import { SpotifyService } from '../spotify.service';

import {
  Router,
  ActivatedRoute
} from '@angular/router'

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artist: any = null
  param: string = ''

  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(
      params => {
        this.param = params['id']
        console.log("param", params['id']);
      },
      error => {
        console.error('Error fetching query:', error);
        // Handle the error, e.g., show a user-friendly message
      }
    );
   }

  ngOnInit(): void {
   this.searchArtists()
  }

  renderResults(res: any): void {
    this.artist = null
    if (res) {
      this.artist = res
    }
  }

  searchArtists() {
    if (!this.param) {
      return
    }
    
    this.spotify
      .getArtist(this.param)
      .subscribe((res: any) => {
        this.renderResults(res)
      })
  }
}

