import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  uri = 'https://corona.lmao.ninja/v2/';

  constructor(private http: HttpClient) { }

  getAllContinents() {
    return this.http.get(`${this.uri}continents?yesterday=true&sort=todayCases`);
  }

  getHistoricalData(country = 'USA', lastDays = 'all') {
    return this.http.get(`${this.uri}historical/${country}?lastdays=${lastDays}`);
  }

  getHistoricalStatesData(state) {
    return this.http.get(`${this.uri}historical/usacounties/${state}`);
  }

  getStatesList() {
    return this.http.get(`${this.uri}historical/usacounties/`);
  }

  getStatesToday() {
    return this.http.get(`${this.uri}states`);
  }

  getGlobalToday() {
    return this.http.get(`${this.uri}all`);
  }
}
