import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieService: jest.Mocked<MovieService>;

  beforeEach(async () => {
    const movieServiceMock = {
      getYearsWithMultipleWinners: jest.fn(),
      getStudiosWithWinCount: jest.fn(),
      getProducersWinInterval: jest.fn(),
      getWinnersByYear: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jest.Mocked<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch years with multiple winners on init', () => {
    const mockYears = { years: [{ year: 2020, winnerCount: 2 }] };
    movieService.getYearsWithMultipleWinners.mockReturnValue(of(mockYears));

    component.ngOnInit();

    expect(movieService.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(component.yearsWithMultipleWinners).toEqual(mockYears.years);
  });

  it('should fetch studios with win count on init', () => {
    const mockStudios = { studios: [{ name: 'Studio A', winCount: 5 }] };
    movieService.getStudiosWithWinCount.mockReturnValue(of(mockStudios));

    component.ngOnInit();

    expect(movieService.getStudiosWithWinCount).toHaveBeenCalled();
    expect(component.topStudios).toEqual(mockStudios.studios);
  });

  it('should fetch producers win interval on init', () => {
    const mockProducers = {
      min: [{ producer: 'Producer A', interval: 1, previousWin: 2019, followingWin: 2020 }],
      max: [{ producer: 'Producer B', interval: 10, previousWin: 2000, followingWin: 2010 }]
    };
    movieService.getProducersWinInterval.mockReturnValue(of(mockProducers));

    component.ngOnInit();

    expect(movieService.getProducersWinInterval).toHaveBeenCalled();
    expect(component.maxInterval).toEqual(mockProducers.max);
    expect(component.minInterval).toEqual(mockProducers.min);
  });

  it('should fetch winners by year', () => {
    const mockWinners = { winners: [{ id: 1, year: 2020, title: 'Movie A', studios: ['Studio A'], producers: ['Producer A'], winner: true }] };
    movieService.getWinnersByYear.mockReturnValue(of(mockWinners));

    component.fetchWinnersByYear(2020);

    expect(movieService.getWinnersByYear).toHaveBeenCalledWith(2020, true);
    expect(component.winnersByYear).toEqual(mockWinners.winners);
  });
});