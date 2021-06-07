import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo, Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  isLoading = false;
  errorMessages = [];
  product: Product;
  selectedPhoto: Photo;
  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getProduct(params["id"]);
    });
  }
  getProduct(id: string) {
    this.isLoading = true;
    this.productService.getProduct(id).subscribe(data =>{
        this.product = data;
        this.selectedPhoto = this.product.photos[0];
        this.isLoading = false;
        this.errorMessages = null;
    }, err => {
      if(err.error instanceof Object) {
        const errors = Object.values(err.error.errors)
        errors.forEach((err: []) => {
          err.forEach(error => {
            this.errorMessages.push(error);
          })
        });
      }
      this.isLoading = false;
    });
  }
}
