import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

/**
 * DashboardComponent: This component is responsible for displaying various movie-related statistics,
 * including years with multiple winners, the top three studios with winners,
 * and producers with the longest and shortest intervals between wins.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: any[] = [];
  topStudios: any[] = [];
  producersInterval: any = { min: [], max: [] };
  winnersByYear: any[] = [];
  selectedYear: number | null = null;
  years: number[] = [];
  maxInterval: any[] = [];
  minInterval: any[] = [];
  studiosWithWinCount: any[] = [];

  constructor(private movieService: MovieService) {}

  /**
   * ngOnInit: Angular lifecycle method called after the component is created.
   * Initializes the necessary data for the dashboard.
   */
  ngOnInit(): void {
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getProducersInterval();
  }

  /**
   * getYearsWithMultipleWinners: Retrieves the years with multiple winners and updates the `yearsWithMultipleWinners` property.
   */
  getYearsWithMultipleWinners(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe(data => {
      this.yearsWithMultipleWinners = data.years;
    });
  }

  /**
   * getStudiosWithWinCount: Retrieves the top three studios with winners and updates the `topStudios` property.
   */
  getStudiosWithWinCount(): void {
    this.movieService.getStudiosWithWinCount().subscribe(data => {
      // Sort studios by win count in descending order and take the top 3
      this.topStudios = data.studios.sort((a, b) => b.winCount - a.winCount).slice(0, 3);
    });
  }

  /**
   * getProducersInterval: Retrieves the producers with the longest and shortest intervals between wins and updates the `maxInterval` and `minInterval` properties.
   */
  getProducersInterval(): void {
    this.movieService.getProducersWinInterval().subscribe(data => {
      this.maxInterval = data.max;
      this.minInterval = data.min;
    });
  }

  /**
   * fetchWinnersByYear: Retrieves the movie winners for a specific year and updates the `winnersByYear` property.
   * @param year - The year for which the winners should be fetched.
   */
  fetchWinnersByYear(year: number): void {
    if (year) {
      this.movieService.getWinnersByYear(year, true).subscribe(data => {
        this.winnersByYear = data.winners;
      });
    }
  }
}