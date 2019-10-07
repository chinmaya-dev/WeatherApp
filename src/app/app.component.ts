import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from './weather-service.service';
import { IDetails } from './models/weatherdetails.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  weatherDetails:IDetails;
  degreeCelsuis:number;
  title = 'cityweatherapp';
  constructor(private apiService: WeatherServiceService) { }
  ngOnInit() {
    this.apiService.getWeatherDetails().subscribe((data)=>{
      //console.log(data);
      this.weatherDetails = data;
      this.degreeCelsuis = this.weatherDetails.main.temp - 273.15 ;
      //console.log(this.weatherDetails.name);
    });
  }
}
