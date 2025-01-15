import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module for the paginate pipe

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let movieService: jest.Mocked<MovieService>;

  beforeEach(async () => {
    const movieServiceMock = {
      getMovies: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [NgxPaginationModule], // Import the module here
      providers: [
        { provide: MovieService, useValue: movieServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jest.Mocked<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    const mockMovies = { content: [], totalElements: 0 };
    movieService.getMovies.mockReturnValue(of(mockMovies));
    component.ngOnInit();
    expect(movieService.getMovies).toHaveBeenCalled();
  });

  it('should filter movies by year', () => {
    const mockMovies = { content: [{ year: 2018, title: 'Movie 1' }, { year: 2019, title: 'Movie 2' }], totalElements: 2 };
    movieService.getMovies.mockReturnValue(of(mockMovies));
    component.yearFilter = 2018;
    component.fetchMovies();
    expect(component.collection).toEqual([{ year: 2018, title: 'Movie 1' }, { year: 2019, title: 'Movie 2' }]);
  });

  it('should filter winners', () => {
    const mockMovies = { content: [{ year: 2018, title: 'Movie 1', winner: true }, { year: 2019, title: 'Movie 2', winner: false }], totalElements: 2 };
    movieService.getMovies.mockReturnValue(of(mockMovies));
    component.winnerFilter = true;
    component.fetchMovies();
    expect(component.collection).toEqual([{ year: 2018, title: 'Movie 1', winner: true }, { year: 2019, title: 'Movie 2', winner: false }]);
  });

  it('should paginate movies', () => {
    const mockMovies = { content: Array.from({ length: 10 }, (_, i) => ({ title: `Movie ${i + 1}`, year: 2000 + i })), totalElements: 100 };
    movieService.getMovies.mockReturnValue(of(mockMovies));
    component.pageSize = 10;
    component.page = 1;
    component.fetchMovies();
    expect(component.collection.length).toBe(10);
  });
});