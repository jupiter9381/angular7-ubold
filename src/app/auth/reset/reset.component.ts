import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  id = new FormControl('', [Validators.required]);
  key = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmpassword = new FormControl('', [Validators.required]);

  error: string;
  check_error: boolean;
  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.check_error = false;
  }

  onSubmit(){
    this.error = this.getErrorMessage();

    if(this.error != ""){
      this.check_error = true;
    } else {
      return this.api.resetPassword({
          id: this.id.value,
          key: this.key.value,
          password: this.password.value,
          confirmPassword: this.confirmpassword.value
      }).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
      );
    }

  }

  getErrorMessage() {
    this.error = "";
    if(this.id.hasError('required')){
        this.error = 'You must enter id';
    } else if(this.key.hasError('required')){
        this.error = 'You must enter key';
    } else if(this.password.hasError('required')){
      this.error = 'You must enter password';
    } else if(this.confirmpassword.hasError('required')){
      this.error = 'You must enter confirmpassword';
    } else if(this.password.value != this.confirmpassword.value){
      this.error = 'Please check the confirm password.';
    }

    return this.error;
  }

  handleResponse(data: any){
    $.toast({
      heading: "Success", 
      text: 'Reset Password Successfully!', 
      position: 'top-right', 
      bgColor: "#4BB543",
      icon: 'success'
    });
    this.router.navigate(['login']);
  }

  handleError(error){
    this.check_error = true;
    if(error.error.errors != undefined){
      this.error = error.error.errors;
    }else{
      this.error = "Server is not responding.";
    }
  }
}
