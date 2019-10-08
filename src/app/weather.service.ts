import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IDetails } from './models/weatherdetails.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }
  API_KEY = '3492d471aae7d96ded83eba070532b16';
  serviceUrl: string;
  //change the value of the API URL as per new city
  getWeatherApiUrl(CityName: string) {

    if (CityName == "") {
      CityName = "Delhi";
    }

    this.serviceUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + CityName + `&appid=${this.API_KEY}`;
    console.log(this.serviceUrl);
  }

  public getWeatherDetails(): Observable<IDetails> {
    return this.httpClient.get<IDetails>(this.serviceUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
