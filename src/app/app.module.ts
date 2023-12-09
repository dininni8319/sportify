import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { TrackComponent } from './track/track.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';

const routes: Routes = [
  {path: "", redirectTo: "search", pathMatch: "full"},
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'albums/:id',
    component: AlbumsComponent
  },
  {
    path: 'artists/:id',
    component: ArtistsComponent
  },
  {
    path: 'tracks/:id',
    component: TrackComponent
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TrackComponent,
    AlbumsComponent,
    ArtistsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
