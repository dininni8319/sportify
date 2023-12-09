import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  id: string | null = null
  track: {
    name: string,
    artists: {
      id: number,
      name: string
    }[],
    album: {
      id: number,
      name: string,
      images: {
        url: string
      }[]
    },
    id: string,
    preview_url: string

  } | null = null

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) {
      route.params.subscribe(params => {
        this.id = params['id']
     })
  }
  back() {
  }

  ngOnInit(): void {

   if (this.id) {
     this.spotify
       .getTrack(this.id)
       // create a subscribe method that renders the tracks
       .subscribe((data: any) => {
          this.track = data
        }
      )
   }
  }
}
