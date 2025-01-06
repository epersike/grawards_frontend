import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getYearsWithMultipleWinners', 'getStudiosWithWinCount', 'getProducersWinInterval', 'getWinnersByYear']);

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch years with multiple winners on init', () => {
    const mockYears = { years: [{ year: 2020, winnerCount: 2 }] };
    movieService.getYearsWithMultipleWinners.and.returnValue(of(mockYears));

    component.ngOnInit();

    expect(movieService.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(component.yearsWithMultipleWinners).toEqual(mockYears.years);
  });

  it('should fetch studios with win count on init', () => {
    const mockStudios = { studios: [{ name: 'Studio A', winCount: 5 }] };
    movieService.getStudiosWithWinCount.and.returnValue(of(mockStudios));

    component.ngOnInit();

    expect(movieService.getStudiosWithWinCount).toHaveBeenCalled();
    expect(component.topStudios).toEqual(mockStudios.studios);
  });

  it('should fetch producers win interval on init', () => {
    const mockProducers = {
      min: [{ producer: 'Producer A', interval: 1, previousWin: 2019, followingWin: 2020 }],
      max: [{ producer: 'Producer B', interval: 10, previousWin: 2000, followingWin: 2010 }]
    };
    movieService.getProducersWinInterval.and.returnValue(of(mockProducers));

    component.ngOnInit();

    expect(movieService.getProducersWinInterval).toHaveBeenCalled();
    expect(component.producersInterval).toEqual(mockProducers);
  });

  it('should fetch winners by year', () => {
    const mockWinners = [{ id: 1, year: 2020, title: 'Movie A', studios: ['Studio A'], producers: ['Producer A'], winner: true }];
    movieService.getWinnersByYear.and.returnValue(of(mockWinners));

    component.fetchWinnersByYear(2020);

    expect(movieService.getWinnersByYear).toHaveBeenCalledWith(2020);
    expect(component.winnersByYear).toEqual(mockWinners);
  });
});