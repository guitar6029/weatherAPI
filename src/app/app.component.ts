import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  greeting: string = '';
  cityName: string = '';
  weatherInfo?: WeatherData;
  weatherCity?: string;
  weatherTemp?: number;
  weatherFeelsLike?: number;
  weatherHumidity?: number;
  weatherWindSpeed?: number;

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private greetUser() {
    const currentHour = new Date().getHours();
    //morning
    if (currentHour < 12) {
      this.greeting = 'Good morning';
    }
    //evening
    else if (currentHour < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(this.cityName).subscribe({
      next: (response) => {
        this.weatherInfo = response;
        console.log(response);
        this.weatherCity = this.weatherInfo.name;
        this.weatherFeelsLike = this.weatherInfo.main.feels_like;
        this.weatherTemp = this.weatherInfo.main.temp;
        this.weatherHumidity = this.weatherInfo.main.humidity;
        this.weatherWindSpeed = this.weatherInfo.wind.speed;
      },
    });
  }

  ngOnInit(): void {
    this.greetUser();
  }
}
