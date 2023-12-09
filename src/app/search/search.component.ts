import { 
  Component, 
  OnInit 
} from '@angular/core';

import { 
  Router, 
  ActivatedRoute
} from '@angular/router'
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  query: string = ''
  results: {
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
    id: string
  }[] | null = null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) {
    this
      .route
      .queryParams
      .subscribe(params => { 
        this.query = params['query'] || ''
      })
    }

  search(): void {
    if (!this.query) {
      return
    }
    
    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => {
        this.renderResults(res)
      })
  }
  
  renderResults(res: any): void {
    this.results = null
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items
    }
  }

  submit(query: string) {
    this.router
      .navigate(
        ['search'], 
        { queryParams: { query: query } }
      )
      .then(_ => this.search())
  }

  ngOnInit(): void {
    this.search()
  }
}
