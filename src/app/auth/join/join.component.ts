import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Supplier } from 'src/app/models/Supplier';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  pageMode = '';

  pStrength = 0;
  pValidations = [];
  password = "";
  showPassword = false;

  serverError: string;
  serverErrors: {code: string, description: string}[] = [];
  isLoading = false;

  cities = [];
  divisions = [];
  
  constructor(
    private authService: AuthService, 
    private location: Location, 
    private router: Router, 
    private route: ActivatedRoute,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.pageMode = data.mode;
      if(this.pageMode == 'register') {
        this.utilService.getCitiesAndDivisions().subscribe(res => {
          this.cities = res.cities;
          this.divisions = res.divisions;
        });
      }
    })
    
  }
  login(data: Partial<Supplier>) {
    this.isLoading = true;
    const loginCreds: Partial<Supplier> = {
      email: data.email.trim().toLowerCase(),
      password: this.password.trim()
    };
    this.authService.login(loginCreds).subscribe(res => {
      this.isLoading = false;
      this.serverError = null
      this.navigate();
    }, err => {
      this.serverError = err.error;
      this.isLoading = false;
    });
  }
  register(data: Partial<Supplier>) {
    this.isLoading = true;
    const supplierData: Partial<Supplier> = {
      name: data.name.trim(),
      phone: '+880' + data.phone.toString(),
      email: data.email.trim().toLowerCase(),
      city: data.city.trim().toLowerCase(),
      division: data.division.trim().toLowerCase(),
      password: data.password.trim()
    }
    this.authService.register(supplierData).subscribe(res => {
      this.isLoading = false;
      this.serverErrors = null;
      this.navigate();
    }, res => {
      this.serverErrors = res.error.errors;
      console.log(this.serverErrors);
      
      this.isLoading = false;
    })
  }
  onSubmit(form: NgForm) {
    switch(this.pageMode) {
      case 'login':
        this.login(form.value);
        break;
      case 'register':
        this.register(form.value);
        break;
    }
  }
  onPassInput(e: Event) {
    this.pValidations = [
      (this.password.length > 5),
      (this.password.search(/[A-Z]/) > -1),
      (this.password.search(/[0-9]/) > -1),
      (this.password.search(/[$&+,:;=?@#]/) > -1),
    ]
    this.pStrength = this.pValidations.reduce((acc, cur) => acc + cur)
  }
  navigate() {
    if(window.history.length > 2)
      this.location.back(); // Only call back if uses came from another page of THIS site.
    else
    this.router.navigateByUrl("/products"); // Go home if came from another website
  }

}
