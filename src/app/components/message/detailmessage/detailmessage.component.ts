import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-detailmessage',
  templateUrl: './detailmessage.component.html',
  styleUrls: ['./detailmessage.component.css']
})
export class DetailmessageComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  fromEmail = new FormControl();
  toEmail = new FormControl();
  name = new FormControl();
  phone = new FormControl();
  subject = new FormControl();
  message = new FormControl();

  message_id:any;
  ngOnInit() {
    $("#side-menu").metisMenu();

    this.message_id= this.route.snapshot.params.id;
    this.getMessage(this.message_id);
  }

  getMessage(id){
    return this.api.getMessageById(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data:any){
    this.fromEmail.setValue(data.data.fromEmail);
    this.toEmail.setValue(data.data.toEmail);
    this.message.setValue(data.data.msg);
    this.name.setValue(data.data.name);
    this.phone.setValue(data.data.phone);
    this.subject.setValue(data.data.subject); 
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
