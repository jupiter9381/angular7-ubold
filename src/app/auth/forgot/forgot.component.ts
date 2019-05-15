import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';

import * as Ladda from 'ladda';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  error: string;
  check_error: boolean;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.check_error = false;
  }

  ngAfterViewInit(){
    Ladda.bind( 'button[type=submit]', { timeout: 2000 } );
  }
  
  onSubmit(){
    this.error = this.getErrorMessage();

    if(this.error != ""){
      this.check_error = true;
    } else {
      return this.api.recover({
          email: this.email.value,
      }).subscribe(
          data => this.handleResponse(data),
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

    return this.error;
  }

  handleResponse(data: any){
    this.router.navigate(['confirm']);
  }
}
