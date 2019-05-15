import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import * as Ladda from 'ladda';

declare var $:any;

@Component({
  selector: 'app-tablemessage',
  templateUrl: './tablemessage.component.html',
  styleUrls: ['./tablemessage.component.css']
})
export class TablemessageComponent implements OnInit {

  constructor(private api: ApiService) { }

  messages = [];

  message_id: any;
  message_index: any;

  // search Form
  check_email = new FormControl();
  search_email = new FormControl();
  check_name = new FormControl();
  search_name = new FormControl();
  check_startDate = new FormControl();
  search_startDate = new FormControl();
  check_endDate = new FormControl();
  search_endDate = new FormControl();
  check_q = new FormControl();
  search_q = new FormControl();
  check_sortType = new FormControl();
  search_sortType = new FormControl();
  check_listingId = new FormControl();
  search_listingId = new FormControl();
  check_key = new FormControl();
  search_key = new FormControl();

  // paginations
  paginations:any;
  totalPage:number;
  selectedPage:number;

  ngOnInit() {
    this.selectedPage = 1;
    this.getAllMessages();
    $("#side-menu").metisMenu();
  }

  ngAfterViewInit(){
    Ladda.bind( 'button[type=submit]', { timeout: 2000 } );
  }

  onSubmit(){
    this.doFilter(1);
  }

  doFilter(pageNum:any){
    let data = {
      check_q: this.check_q.value,
      search_q: this.search_q.value,
      check_email: this.check_email.value,
      search_email: this.search_email.value,
      check_name: this.check_name.value,
      search_name: this.search_name.value,
      check_sortType: this.check_sortType.value,
      search_sortType: this.search_sortType.value,
      check_startDate: this.check_startDate.value,
      search_startDate: this.search_startDate.value,
      check_endDate: this.check_endDate.value,
      search_endDate: this.search_endDate.value,
      check_listingId: this.check_listingId.value,
      search_listingId: this.search_listingId.value,
      check_key: this.check_key.value,
      search_key: this.search_key.value,
    };
    return this.api.getMessagesByKey(data, pageNum).subscribe(
      data => this.handleResponse(data, "getMessagesByKey"),
      //error => this.handleError(error)
    );
  }

  getAllMessages(){
    return this.api.getAllMessages().subscribe(
        data => this.handleResponse(data, "getMessages"),
        error => this.handleError(error)
    );
  }
  handleResponse(data:any, type:any){
    switch(type) {
      case "getMessages":
        this.messages = data.data.messages;
        this.totalPage = data.data.totalPages;
        this.paginations = [];
        for(let i = 1; i <= this.totalPage; i++){
          this.paginations.push({pageNum: i});
        }
        break;
      case "getMessagesByKey":
        this.messages = data.data.messages;
        if(this.selectedPage == 1){
          this.totalPage = data.data.totalPages;
          this.paginations = [];
          for(let i = 1; i <= this.totalPage; i++){
            this.paginations.push({pageNum: i});
          }
        }
        break;
      default:
        // code block
    }
  }
  setMessageId(id:any, index:number){
    this.message_id = id;
    this.message_index = index;
  }

  onDeleteMessage(){
    return this.api.deleteMessage(this.message_id).subscribe(
      data => this.handleDeleteResponse(data, this.message_index),
      error => this.handleError(error)
    );
  }

  handleDeleteResponse(data:any, index:number){
    $.toast({
      heading: "Success", 
      text: 'Deleted Successfully!', 
      position: 'top-right', 
      bgColor: "#4BB543",
      icon: 'success'
    });
    this.messages.splice(index, 1);
    $("#delete-modal").modal('hide');
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

  gotoNextPage(){
    if(this.totalPage == this.selectedPage){
      this.doFilter(this.selectedPage);
    } else {
      $("ul.pagination li.page").removeClass('active');
      $("ul.pagination li.page:nth("+this.selectedPage+")").addClass("active");
      this.selectedPage += 1;
      this.doFilter(this.selectedPage);
    }
  }
  gotoBeforePage(){
    if(this.selectedPage == 1){
      this.doFilter(this.selectedPage);
    } else {
      $("ul.pagination li.page").removeClass('active');
      this.selectedPage = this.selectedPage - 1;
      
      $("ul.pagination li.page:nth("+(this.selectedPage - 1)+")").addClass("active");
      this.doFilter(this.selectedPage);
    }
  }
  
  gotoPage(index:number){
    $("ul.pagination li.page").removeClass('active');
    $("ul.pagination li.page:nth("+index+")").addClass("active");
    this.selectedPage = index + 1;
    this.doFilter(this.selectedPage);
  }
}
