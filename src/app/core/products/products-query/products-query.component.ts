import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/models/AuthData';
import { SearchFilter } from 'src/app/models/SearchFilter';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-products-query',
  templateUrl: './products-query.component.html',
  styleUrls: ['./products-query.component.scss']
})
export class ProductsQueryComponent implements OnInit, OnDestroy {
  categories = [
    "Any",
    "Phones",
    "Clothes",
    "Laptop and Computers",
    "PC Parts",
    "Cars",
    "Bikes",
    "Real Estates"
  ];
  sort = [
    "None",
    "Price: Low to High",
    "Price: High to Low",
    "Date: Old to New",
    "Date: New to Old"
  ];
  cities = [];
  divisions = [];
  suppliers = [
    "All Products",
    "My Products",
  ];
  authSub: Subscription;
  authData: AuthData = null;
  constructor(
    private productsService: ProductsService, 
    private uiService: UiService, 
    private utilService: UtilService,
    private asuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.utilService.getCitiesAndDivisions().subscribe(res => {
      this.cities = res.cities;
      this.divisions = res.divisions;
    });
    this.authSub = this.asuthService.authUser$.subscribe(authData => {
      this.authData = authData;
    });
  }
  onSubmit(form: NgForm) {
    const searchFilter: SearchFilter = {
      category: form.value.category !== "Any" ? form.value.category ?? null : null,
      sortParam: form.value.sort !== "None" ? form.value.sort ?? null : null,
      city: form.value.city !== "Any" ? form.value.city ?? null : null,
      division: form.value.division !== "Any" ? form.value.division ?? null : null,
      name: null,
      sellerId: form.value.supplier === "My Products" ? this.authData.id : null
    }
    this.productsService.updateFilter(searchFilter);
    this.uiService.setSidenavVisibility(false);
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
