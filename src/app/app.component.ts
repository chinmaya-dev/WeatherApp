import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { IDetails } from './models/weatherdetails.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  weatherDetails: IDetails;
  degreeUnit: string;
  maxDegreeCelsuis: string;
  minDegreeCelsuis: string;
  TempUnit: string = "";
  title = 'cityweatherapp';
  CityName: string = "";
  isCelsius: boolean = false;
  isKelvin: boolean = false;
  isFarh: boolean = false;
  errorMessage: string;
  isDisplayReport: boolean = true;
  isLoader: boolean;
  isDisableButton: boolean = true;
  validationMessage: string;
  isShowValidationMessage: boolean = true;
  constructor(private apiService: WeatherService) { }

  //function to call the service where the api call happens
  getWeatherByCityName() {
    this.isLoader = true;
    this.apiService.getWeatherApiUrl(this.CityName);
    this.apiService.getWeatherDetails().subscribe((data) => {
      
      this.weatherDetails = data;

      console.log(this.weatherDetails.main.temp);

      if (this.TempUnit == "Kelvin") {
        this.isCelsius = false;
        this.isFarh = false;
        this.isKelvin = true;
        this.degreeUnit = (this.weatherDetails.main.temp).toFixed(2);
        this.maxDegreeCelsuis = (this.weatherDetails.main.temp_max).toFixed(2);
        this.minDegreeCelsuis = (this.weatherDetails.main.temp_min).toFixed(2);
      }
      else if (this.TempUnit == "Farh") {
        this.isKelvin = false;
        this.isCelsius = false;
        this.isFarh = true;
        this.degreeUnit = (9 / 5 * (this.weatherDetails.main.temp - 273.15) + 32).toFixed(2);
        this.maxDegreeCelsuis = (9 / 5 * (this.weatherDetails.main.temp_max - 273.15) + 32).toFixed(2);
        this.minDegreeCelsuis = (9 / 5 * (this.weatherDetails.main.temp_min - 273.15) + 32).toFixed(2);
      }
      else {
        this.isFarh = false;
        this.isKelvin = false;
        this.isCelsius = true;
        this.degreeUnit = (this.weatherDetails.main.temp - 273.15).toFixed(2);
        this.maxDegreeCelsuis = (this.weatherDetails.main.temp_max - 273.15).toFixed(2);
        this.minDegreeCelsuis = (this.weatherDetails.main.temp_min - 273.15).toFixed(2);

      }
      this.isLoader = false;
      this.isDisplayReport = true;




    },
      (error) => {
        this.errorMessage = "!Invalid city name ,unable to display weather report";

        this.isDisplayReport = false;
        this.isLoader = false;
      });
  }
  //disable and enable the submit button if the city name is selected 
  disableButton(CityName) {
    
    if (this.CityName == "") {
      this.isDisableButton = true;
      this.isShowValidationMessage = true;
      
    }
    else {
      this.isDisableButton = false;
      this.isShowValidationMessage = false;
    }
  }
  ngOnInit() {
    
    this.getWeatherByCityName();

  }

}
