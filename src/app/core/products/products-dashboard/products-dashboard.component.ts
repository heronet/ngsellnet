import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { SearchFilter } from 'src/app/models/SearchFilter';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit, OnDestroy {
  // UI
  isLoading = false;
  errorMessage: string = null;
  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;
  // Logic
  products: Product[] = [];
  searchParam = "";
  filter: SearchFilter = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    sortParam: null,
    name: null,
    city: null,
    category: null,
    division: null
  };
  private filterSub: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.filterSub = this.productsService.filterUpdated$.subscribe(filter => {
      this.filter.category = filter.category;
      this.filter.city = filter.city;
      this.filter.division = filter.division;
      this.filter.sortParam = filter.sortParam;
      this.filter.name = this.searchParam.trim();
      this.filter.sellerId = filter.sellerId;
      this.filter.pageNumber = this.pageNumber = 1; // Reset the pageNumber on filter.
      this.getProducts();
    })
  }
  getProducts() {
    this.isLoading  = true;
    this.productsService.getProducts(this.filter).subscribe((response) => {
      this.products = response.data;
      this.totalItems = response.size;
      this.isLoading = false;
      this.errorMessage = null;
    }, error => {
      this.isLoading = false;
      this.errorMessage = "An error occured";
    });
  }
  onSearch() {
    this.filter.name = this.searchParam;
    this.filter.pageNumber = this.pageNumber = 1; // Reset the pageNumber on Search.
    this.getProducts();
  }
  onChangePage(dir: string) {
    if(dir === "next") {
      if(this.totalItems >= this.pageSize * this.pageNumber)
        ++this.pageNumber;
    }
    if(dir === "prev") {
      if(this.pageNumber > 1)
        --this.pageNumber;
    }
    this.filter.pageNumber = this.pageNumber;
    this.getProducts();
  }
  ngOnDestroy() {
    this.filterSub.unsubscribe();
  }

}
