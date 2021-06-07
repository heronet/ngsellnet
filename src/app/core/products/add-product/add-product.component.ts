import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  isLoading = false;
  categories = [
    "Phones",
    "Clothes",
    "Laptop and Computers",
    "PC Parts",
    "Cars",
    "Bikes",
    "Real Estates"
  ];
  files: File[] = [];
  previews = [];
  errorMessage: string = null;

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }
  onFilesSelected(event: any) {
    const files: FileList = event.target.files
    // The next two lines prevent user from selecting new images again. Which may result in more than 5 images
    this.files = [];
    this.previews = [];
    if(files.length > 5 || this.previews.length > 5) {
      this.errorMessage = "You can only add up to 5 photos";
      this.files = [];
      this.previews = [];
      return;
    }
    for(let i = 0; i != files.length; ++i) {
      const file = files[i];
      if(file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.errorMessage = "You can only upload photos!";
        this.files = [];
        this.previews = [];
        return;
      }
      this.errorMessage = null;
      this.files.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.previews.push(reader.result as string);
      }
      reader.readAsDataURL(files[i]);
    }
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const data = form.value;
    const formdata = new FormData();
    formdata.append('name', data.name.trim());
    formdata.append('price', data.price.toString());
    formdata.append('description', data.description.trim());
    formdata.append('category', data.category);
    this.files.forEach(file => {
      formdata.append('photos', file)
    });
    this.productsService.addProduct(formdata).subscribe(res => {
      this.isLoading = false;
      this.router.navigateByUrl('/products');
    }, err => {
      this.isLoading = false;
      this.errorMessage = err.error;
    }) 
  }

}
