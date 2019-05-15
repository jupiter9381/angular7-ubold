import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';

import * as Ladda from 'ladda';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  error: string;
  check_error: boolean;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  
  

  constructor(
    private router: Router,
    private api: ApiService,
    private token: TokenService,
  ) {
   }

  ngOnInit() {
    this.check_error = false;
  }

  ngAfterViewInit(){
    Ladda.bind( 'button[type=submit]', { timeout: 2000 } );
  }

  onSubmit(){
    this.submitted = true;
    this.error = this.getErrorMessage();

    this.loading = true;

    if(this.error != ""){
      this.check_error = true;
    } else {
      return this.api.login({
          email: this.email.value,
          password: this.password.value
      }).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
      );
    }

    

  }

  getErrorMessage() {
    this.error = "";
    if(this.email.hasError('required')){
        this.error = 'You must enter email';
    }
    else if(this.email.hasError('email')){
        this.error = 'Not a valid email';
    }
    else if(this.password.hasError('required')){
        this.error = 'You must enter password';
    }

    return this.error;
  }


  handleResponse(data: any){
    this.loading = false;
    this.token.handle(data.data.token);
    localStorage.setItem('user_id', data.data.user.id);
    localStorage.setItem('user_name', data.data.user.fullName);
    localStorage.setItem('user_avatar', data.data.user.avatarPic);
    localStorage.setItem('token', data.data.token);
    $.toast({
      heading: "Success", 
      text: 'Login Successfully!', 
      position: 'top-right', 
      bgColor: "#4BB543",
      icon: 'success'
    });
    
    // this.auth.changeAuthStatus(true);
    this.router.navigate(['profile']);
  }

  handleError(error){
    this.loading = false;
    this.check_error = true;
    if(error.error.errors != undefined){
      this.error = error.error.errors;
    }else{
      this.error = "Server is not responding.";
    }
  }
}
