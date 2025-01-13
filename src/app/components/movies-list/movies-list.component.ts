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
  page: number = 0;
  pageSize: number = 10;
  yearFilter: number | null = null;
  winnerFilter: boolean | null = null;
  selectedYear: number | null = null;
  selectedWinner: boolean | null = null;
  years: number[] = [];
  collection: any[] = [];

  constructor(private movieService: MovieService) {}

  /**
   * ngOnInit: Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by fetching the initial list of movies.
   */
  ngOnInit(): void {
    this.fetchMovies();
  }

  /**
   * fetchMovies: Fetches the list of movies from the API based on the current filters and pagination settings.
   */
  fetchMovies(): void {
    this.movieService.getMovies(this.page, this.pageSize, this.winnerFilter, this.yearFilter)
      .subscribe(response => {
        this.collection = response.content;
        this.totalMovies = response.totalElements;
      });
  }

  /**
   * onPageChange: Handles the page change event and fetches the movies for the new page.
   * @param page The new page number.
   */
  onPageChange(page: number): void {
    this.page = page;
    this.fetchMovies();
  }

  applyFilters(): void {
    this.page = 0;
    this.fetchMovies();
  }

  onFilterChange(): void {
    this.applyFilters();
  }
}