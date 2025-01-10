import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movies-list',
    standalone: false,
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  totalMovies: number = 0;
  page: number = 1;
  pageSize: number = 10;
  yearFilter: number | null = null;
  winnerFilter: boolean | null = null;
  selectedYear: number | null = null;
  selectedWinner: boolean | null = null;
  years: number[] = [];
  collection: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies(this.page, this.pageSize, this.winnerFilter, this.yearFilter)
      .subscribe(response => {
        this.collection = response.content;
        this.totalMovies = response.totalElements;
      });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchMovies();
  }

  applyFilters(): void {
    this.page = 1; // Reset to first page on filter change
    this.fetchMovies();
  }

  onFilterChange(): void {
    this.applyFilters();
  }
}