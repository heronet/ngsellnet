import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pStrength = 0;
  pValidations = [];
  password = "";
  showPassword = false;
  
  constructor() { }

  ngOnInit(): void {
    
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

}
