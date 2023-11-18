import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SpotifyService } from '../spotify.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], { queryParams: of({ query: 'test' }) });
    const spotifyServiceSpyObj = jasmine.createSpyObj('SpotifyService', ['searchTrack']);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteSpyObj },
        { provide: SpotifyService, useValue: spotifyServiceSpyObj }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    spotifyServiceSpy = TestBed.inject(SpotifyService) as jasmine.SpyObj<SpotifyService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize query from query parameter', () => {
    expect(component.query).toBe('test');
  });

  it('should call search method on component initialization', () => {
    spyOn(component, 'search');
    component.ngOnInit();
    expect(component.search).toHaveBeenCalled();
  });

  it('should navigate to search route with query parameter on submit', () => {
    const query = 'test';
    component.submit(query);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['search'], { queryParams: { query: query } });
  });

  it('should call searchTrack method on SpotifyService with query', () => {
    const query = 'test';
    component.search();
    expect(spotifyServiceSpy.searchTrack).toHaveBeenCalledWith(query);
  });

  it('should render results when searchTrack returns valid response', () => {
    const res = {
      tracks: {
        items: [
          {
            name: 'Track 1',
            artists: [
              {
                id: 1,
                name: 'Artist 1'
              }
            ],
            album: {
              id: 1,
              name: 'Album 1',
              images: [
                {
                  url: 'https://example.com/image1.jpg'
                }
              ]
            },
            id: '1'
          }
        ]
      }
    };
    component.renderResults(res);
    expect(component.results).toEqual(res.tracks.items);
  });

  it('should not render results when searchTrack returns invalid response', () => {
    const res = {
      tracks: {
        items: null
      }
    };
    component.renderResults(res);
    expect(component.results).toBeNull();
  });
});