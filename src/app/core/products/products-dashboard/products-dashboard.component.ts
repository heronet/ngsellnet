import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit {
  // UI
  isloading = false;
  errorMessage: string = null;
  // Logic
  products: Product[] = [];
  totalItems = 0;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.isloading  = true;
    this.productsService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.totalItems = response.size;
      this.isloading = false;
      this.errorMessage = null;
    }, error => {
      this.isloading = false;
      this.errorMessage = "An error occured";
    });
  }

}
