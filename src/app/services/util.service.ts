import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { } 
  getCitiesAndDivisions() {
    return this.http.get<{cities: string[], divisions: string[]}>(`${this.BASE_URL}/utilities/locations`);
  }
}
