import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {
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

  constructor(private route: ActivatedRoute) {
      route.params.subscribe(params => {
        this.id = params['id']
     })
  }
  back() {
  }
}
