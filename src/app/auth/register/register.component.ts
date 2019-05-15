import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fullName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  submitted = false;
  error: string;

  constructor(
    private router: Router,
    private api: ApiService,
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    this.error = this.getErrorMessage();

    return this.api.register({
      fullName: this.fullName.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );

  }

  getErrorMessage() {
    this.error = "";
    if(this.email.hasError('required')){
        this.error = 'You must enter email';
    } else if(this.email.hasError('email')){
        this.error = 'Not a valid email';
    } else if(this.password.hasError('required')){
        this.error = 'You must enter password';
    } else if(this.confirmPassword.hasError('required')){
      this.error = 'You must enter confirm password';
    } else if(this.fullName.hasError('required')){
      this.error = 'You must enter full name';
    }

    return this.error;
  }

  handleResponse(data: any){
    $.toast({
      heading: "Success", 
      text: 'Registered Successfully!', 
      position: 'top-right', 
      bgColor: "#4BB543",
      icon: 'success'
    });

    this.router.navigate(['login']);
  }

  handleError(error: any){
    if(error.error.code == 400){
      let error_messages = error.error.errors.join("<br />");

      $.toast({
        heading: "Warning", 
        text: error_messages, 
        position: 'top-right', 
        bgColor: "#FF3425",
        icon: 'warning',
        delay: 3000
      });
    } else if(error.error.code == 401){
      let error_messages = error.error.errors.join("<br />");

      $.toast({
        heading: "Warning", 
        text: error_messages, 
        position: 'top-right', 
        bgColor: "#FF3425",
        icon: 'warning',
        delay: 3000
      });
    }
  }

}
