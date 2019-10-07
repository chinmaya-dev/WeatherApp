import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDetails } from './models/weatherdetails.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private httpClient: HttpClient) { }
  API_KEY = '3492d471aae7d96ded83eba070532b16';
  
  public getWeatherDetails(): Observable<IDetails>{
    return this.httpClient.get<IDetails>(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${this.API_KEY}`);
  }
}
