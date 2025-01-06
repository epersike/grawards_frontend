import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) { }

  getYearsWithMultipleWinners(): Observable<any> {
    return this.http.get(`${this.apiUrl}?projection=years-with-multiple-winners`);
  }

  getStudiosWithWinCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}?projection=studios-with-win-count`);
  }

  getProducersWinInterval(): Observable<any> {
    return this.http.get(`${this.apiUrl}?projection=max-min-win-interval-for-producers`);
  }

  getWinnersByYear(year: number, winner: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}?winner=${winner}&year=${year}`);
  }

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