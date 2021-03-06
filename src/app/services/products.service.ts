import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';
import { SearchFilter } from '../models/SearchFilter';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BASE_URL = environment.BASE_URL;
  private filterUpdate = new Subject<SearchFilter>();
  filterUpdated$ = this.filterUpdate.asObservable();

  constructor(private http: HttpClient) { }

  updateFilter(searchFilter: SearchFilter) {
    this.filterUpdate.next(searchFilter);
  }
  getProducts(filter: SearchFilter) {
    return this.http.get<{data: Product[], size: number}>(
      `${this.BASE_URL}/products/all?pageSize=${filter.pageSize}&pageNumber=${filter.pageNumber}&name=${filter.name ?? ''}&sortParam=${filter.sortParam ?? ''}&division=${filter.division ?? ''}&city=${filter.city ?? ''}&category=${filter.category ?? ''}&sellerId=${filter.sellerId ?? ''}`
    );
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }
  addProduct(formData: FormData) {
    return this.http.post(`${this.BASE_URL}/products`, formData);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.BASE_URL}/products/${id}`);
  }
}
