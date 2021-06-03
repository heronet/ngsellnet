import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<{data: Product[], size: number}>(`${this.BASE_URL}/products/all`);
  }
}
