import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/models/AuthData';
import { Photo, Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  isLoading = false;
  errorMessages = [];
  product: Product;
  selectedPhoto: Photo;
  canDelete = false;
  authSub: Subscription;
  authData: AuthData = null;

  constructor(
    private productService: ProductsService, 
    private route: ActivatedRoute,
    private router: Router,
    private asuthService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getProduct(params["id"]);
    });
    this.authSub = this.asuthService.authUser$.subscribe(authData => {
      this.authData = authData;
    });
  }
  getProduct(id: string) {
    this.isLoading = true;
    this.productService.getProduct(id).subscribe(data =>{
        this.product = data;
        this.selectedPhoto = this.product.photos[0];
        this.isLoading = false;
        this.errorMessages = null;
        if(this.authData.id === this.product.supplier.id || this.authData.roles.includes("Admin"))
          this.canDelete = true;
    }, err => {
      if(err.error instanceof Object) {
        if(err.error.errors) {
          const errors = Object.values(err.error.errors)
          errors.forEach((err: []) => {
            err.forEach(error => {
              this.errorMessages.push(error);
            })
          });
        }
      }
      // this.isLoading = false;
    });
  }
  deleteProduct() {
    this.isLoading = true;
    this.productService.deleteProduct(this.product.id).subscribe(res => {
      this.isLoading = false;
      this.router.navigateByUrl("/products");
    }, err => {
      // this.errorMessages.push(err.error);
      console.log(err);
      
      this.isLoading = false;
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
