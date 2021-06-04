import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchFilter } from 'src/app/models/SearchFilter';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-query',
  templateUrl: './products-query.component.html',
  styleUrls: ['./products-query.component.scss']
})
export class ProductsQueryComponent implements OnInit {
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
  divisions = [
    "Any",
    "Dhaka",
    "Rajshahi",
    "Sylhet",
    "Chittagong",
    "Barishal",
    "Khulna",
    "Rangpur",
    "Mymensingh"
  ];
  cities = [
    "Any",
    "Naogaon",
    "Bogra",
    "Rajshahi",
    "Dhaka",
    "Chittagong"
  ]
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    const searchFilter: SearchFilter = {
      category: form.value.category !== "Any" ? form.value.category ?? null : null,
      sortParam: form.value.sort !== "None" ? form.value.sort ?? null : null,
      city: form.value.city !== "Any" ? form.value.city ?? null : null,
      division: form.value.division !== "Any" ? form.value.division ?? null : null,
      name: null
    }
    this.productsService.updateFilter(searchFilter);
  }

}
