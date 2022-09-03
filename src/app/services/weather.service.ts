import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${environment.baseWeatherApiURL}${cityName}`,
      {
        headers: new HttpHeaders()
          .set(environment.XRapidAPIHostHeader, environment.XRapidAPIHost)
          .set(environment.XRapidAPIKeyHeader, environment.XRapidAPIKey),
          params : new HttpParams().set('mode', 'json')
      }
    );
  }
}
