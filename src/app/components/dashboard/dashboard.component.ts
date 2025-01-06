import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

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

  ngOnInit(): void {
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getProducersInterval();
  }

  getYearsWithMultipleWinners(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe(data => {
      this.yearsWithMultipleWinners = data.years;
    });
  }

  getStudiosWithWinCount(): void {
    this.movieService.getStudiosWithWinCount().subscribe(data => {
      this.topStudios = data.studios
        .sort((a, b) => b.winCount - a.winCount)
        .slice(0, 3);
    });
  }

  getProducersInterval(): void {
    this.movieService.getProducersWinInterval().subscribe(data => {
      this.producersInterval = data;
      this.maxInterval = data.max;
      this.minInterval = data.min;
    });
  }

  fetchWinnersByYear(selectedYear: number): void {
    if (selectedYear) {
      this.movieService.getWinnersByYear(selectedYear, true).subscribe(data => {
        this.winnersByYear = data;
      });
    }
  }
}