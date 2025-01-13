/**
 * MovieService is an Angular service that provides methods to interact with the movie API.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) { }

  /**
   * Fetches years with multiple winners from the API.
   * @returns An Observable containing the response from the API.
   */
  getYearsWithMultipleWinners(): Observable<any> {
    return this.http.get(`${this.apiUrl}?projection=years-with-multiple-winners`);
  }

  /**
   * Fetches studios with their win count from the API.
   * @returns An Observable containing the response from the API.
   */
  getStudiosWithWinCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}?projection=studios-with-win-count`);
  }

  /**
   * Fetches the maximum and minimum win interval for producers from the API.
   * @returns An Observable containing the response from the API.
   */
  getProducersWinInterval(): Observable<any> {
    return this.http.get(`${this.apiUrl}?projection=max-min-win-interval-for-producers`);
  }

  /**
   * Fetches winners by year from the API.
   * @param year The year to filter winners by.
   * @param winner A boolean indicating whether to filter by winners.
   * @returns An Observable containing the response from the API.
   */
  getWinnersByYear(year: number, winner: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}?winner=${winner}&year=${year}`);
  }

  /**
   * Fetches movies with pagination and optional filters from the API.
   * @param page The page number for pagination.
   * @param size The number of items per page.
   * @param winner A boolean indicating whether to filter by winners.
   * @param year The year to filter movies by.
   * @returns An Observable containing the response from the API.
   */
  getMovies(page: number, size: number, winner: boolean, year: number): Observable<any> {
    let queryParams = [
      `page=${page}`,
      `size=${size}`
    ];
    if (year !== null) {
      queryParams.push(`year=${year}`);
    }
    if (winner !== null) {
      queryParams.push(`winner=${winner}`);
    }
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    return this.http.get(`${this.apiUrl}${queryString}`);
  }


}