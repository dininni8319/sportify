import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  {path: "", redirectTo: "search", pathMatch: "full"},
  {
    path: 'search',
    component: SearchComponent
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
