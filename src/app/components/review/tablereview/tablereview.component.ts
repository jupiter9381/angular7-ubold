import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../../service/api.service';

declare var $:any;



@Component({
  selector: 'app-tablereview',
  templateUrl: './tablereview.component.html',
  styleUrls: ['./tablereview.component.css']
})
export class TablereviewComponent implements OnInit {

  constructor(private api: ApiService) { }

  reviews = [];

  review_id:any;
  review_index:any;

  // search Form
  check_maxRating = new FormControl();
  search_maxRating = new FormControl();
  check_minRating = new FormControl();
  search_minRating = new FormControl();
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
    this.getAllReviews();
    this.selectedPage = 1;
    $("#side-menu").metisMenu();
  }

  getAllReviews(){
    return this.api.getAllReviews().subscribe(
        data => this.handleResponse(data, "getReviews"),
        error => this.handleError(error)
    );
  }

  onSubmit(){
    this.doFilter(1);
  }

  doFilter(pageNum:any){
    let data = {
      check_q: this.check_q.value,
      search_q: this.search_q.value,
      check_maxRating: this.check_maxRating.value,
      search_maxRating: this.search_maxRating.value,
      check_minRating: this.check_minRating.value,
      search_minRating: this.search_minRating.value,
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
    return this.api.getReviewsByKey(data, pageNum).subscribe(
      data => this.handleResponse(data, "getReviewsByKey"),
      //error => this.handleError(error)
    );
  }
  handleResponse(data:any, type:any){
    switch(type) {
      case "getReviewsByKey":
        this.reviews = data.data.reviews;
        if(this.selectedPage == 1){
          this.totalPage = data.data.totalPages;
          this.paginations = [];
          for(let i = 1; i <= this.totalPage; i++){
            this.paginations.push({pageNum: i});
          }
        }
        break;
      case "getReviews":
        this.reviews = data.data.reviews;
        this.totalPage = data.data.totalPages;
        this.paginations = [];
        for(let i = 1; i <= this.totalPage; i++){
          this.paginations.push({pageNum: i});
        }
        break;
      default:
        // code block
    }
  }

  setReviewId(id:any, index:number){
    this.review_id = id;
    this.review_index = index;
  }
  onDeleteReview(){
    return this.api.deleteReview(this.review_id).subscribe(
      data => this.handleDeleteResponse(data, this.review_index),
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
    this.reviews.splice(index, 1);
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
