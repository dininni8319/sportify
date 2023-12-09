import { Component } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router'
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {

  album: any = null
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
   this.searchAlbums()
  }

  renderResults(res: any): void {
    this.album = null
    if (res) {
      this.album = res
    }
  }

  searchAlbums() {
    if (!this.param) {
      return
    }
    
    this.spotify
      .getAlbums(this.param)
      .subscribe((res: any) => {
        this.renderResults(res)
      })
  }
}
