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
  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this
      .route
      .params
      .subscribe(params => {
      this.artist = this.spotify.getArtist(params['id'])
    })
   }

  ngOnInit(): void {
    console.log("artista",this.artist)
  }
}
