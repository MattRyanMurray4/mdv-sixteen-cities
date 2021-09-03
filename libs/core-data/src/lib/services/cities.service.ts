import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@city/api-interfaces';

export const BASE_URL = 'https://db-30x30.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private model = 'cities';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<City[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<City>(this.getUrlById(id));
  }

  create(city: City) {
    return this.httpClient.post<City>(this.getUrl(), city);
  }

  update(city: City) {
    return this.httpClient.patch<City>(this.getUrlById(city.id), city);
  }

  delete(cityId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(cityId))
      .pipe(mapTo(cityId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}
