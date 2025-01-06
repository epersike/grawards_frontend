import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies', 'getMoviesByYear', 'getWinnersByYear']);

    await TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    movieService.getMovies.and.returnValue(of([]));
    component.ngOnInit();
    expect(movieService.getMovies).toHaveBeenCalled();
  });

  it('should filter movies by year', () => {
    const movies = [{ year: 2018, title: 'Movie 1' }, { year: 2019, title: 'Movie 2' }];
    movieService.getMovies.and.returnValue(of(movies));
    component.ngOnInit();
    component.filterByYear(2018);
    expect(component.filteredMovies).toEqual([{ year: 2018, title: 'Movie 1' }]);
  });

  it('should filter winners', () => {
    const movies = [{ year: 2018, title: 'Movie 1', winner: true }, { year: 2019, title: 'Movie 2', winner: false }];
    movieService.getMovies.and.returnValue(of(movies));
    component.ngOnInit();
    component.filterWinners(true);
    expect(component.filteredMovies).toEqual([{ year: 2018, title: 'Movie 1', winner: true }]);
  });

  it('should paginate movies', () => {
    component.movies = Array.from({ length: 100 }, (_, i) => ({ title: `Movie ${i + 1}`, year: 2000 + i }));
    component.pageSize = 10;
    component.currentPage = 1;
    component.paginate();
    expect(component.paginatedMovies.length).toBe(10);
  });
});