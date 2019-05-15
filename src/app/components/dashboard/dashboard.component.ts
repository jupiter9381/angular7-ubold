import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiService) { }

  listings:any;
  reviews:any;
  messages:any;

  // review paginations
  listing_paginations:any;
  listing_totalPage:number;
  listing_selectedPage:number;

  // review paginations
  review_paginations:any;
  review_totalPage:number;
  review_selectedPage:number;

  // message paginations
  message_paginations:any;
  message_totalPage:number;
  message_selectedPage:number;

  ngOnInit() {
    $("#side-menu").metisMenu();

    this.getActiveListing(1);
    this.recentReviews(1);
    this.recentMessages(1);

  }

  getActiveListing(pageNum:number){
    return this.api.getActiveListings(pageNum).subscribe(
        data => this.handleResponse(data, "getActiveListing"),
        //error => this.handleError(error)
    );
  }

  recentReviews(pageNum:number){
    return this.api.getRecentReviews(pageNum).subscribe(
        data => this.handleResponse(data, "getRecentReviews"),
        //error => this.handleError(error)
    );
  }

  recentMessages(pageNum:number){
    return this.api.getRecentMessages(pageNum).subscribe(
        data => this.handleResponse(data, "getRecentMessages"),
        //error => this.handleError(error)
    );
  }
  handleResponse(data:any, type:any){
    switch(type){
      case "getActiveListing":
        this.listings = data.data.listings;
        console.log(this.listings);
        this.listing_totalPage = data.data.totalPages;
        this.listing_paginations = [];
        for(let i = 1; i <= this.listing_totalPage; i++){
          this.listing_paginations.push({pageNum: i});
        }
        break;
      case "getRecentReviews":
        this.reviews = data.data.reviews;
        console.log(this.reviews);
        this.review_totalPage = data.data.totalPages;
        this.review_paginations = [];
        for(let i = 1; i <= this.review_totalPage; i++){
          this.review_paginations.push({pageNum: i});
        }
        break;
      case "getRecentMessages":
        this.messages = data.data.messages;
        console.log(this.messages);
        this.message_totalPage = data.data.totalPages;
        this.message_paginations = [];
        for(let i = 1; i <= this.message_totalPage; i++){
          this.message_paginations.push({pageNum: i});
        }
        break;
      default:
        break;
    }
  }

  gotoNextListingPage(){
    if(this.listing_totalPage == this.listing_selectedPage){
      this.getActiveListing(this.listing_selectedPage);
    } else {
      $("ul.listing-pagination li.page").removeClass('active');
      $("ul.listing-pagination li.page:nth("+this.listing_selectedPage+")").addClass("active");
      this.listing_selectedPage += 1;
      this.getActiveListing(this.listing_selectedPage);
    }
  }
  gotoBeforeListingPage(){
    if(this.listing_selectedPage == 1){
      this.getActiveListing(this.listing_selectedPage);
    } else {
      $("ul.listing-pagination li.page").removeClass('active');
      this.listing_selectedPage = this.listing_selectedPage - 1;
      
      $("ul.listing-pagination li.page:nth("+(this.listing_selectedPage - 1)+")").addClass("active");
      this.getActiveListing(this.listing_selectedPage);
    }
  }

  gotoListingPage(index:number){
    $("ul.listing-pagination li.page").removeClass('active');
    $("ul.listing-pagination li.page:nth("+index+")").addClass("active");
    this.listing_selectedPage = index + 1;
    this.getActiveListing(this.listing_selectedPage);
  }

  gotoNextReviewPage(){
    if(this.review_totalPage == this.review_selectedPage){
      this.recentReviews(this.review_selectedPage);
    } else {
      $("ul.review-pagination li.page").removeClass('active');
      $("ul.review-pagination li.page:nth("+this.review_selectedPage+")").addClass("active");
      this.review_selectedPage += 1;
      this.recentReviews(this.review_selectedPage);
    }
  }
  gotoBeforeReviewPage(){
    if(this.review_selectedPage == 1){
      this.recentReviews(this.review_selectedPage);
    } else {
      $("ul.review-pagination li.page").removeClass('active');
      this.review_selectedPage = this.review_selectedPage - 1;
      $("ul.review-pagination li.page:nth("+(this.review_selectedPage - 1)+")").addClass("active");
      this.recentReviews(this.review_selectedPage);
    }
  }

  gotoReviewPage(index:number){
    $("ul.review-pagination li.page").removeClass('active');
    $("ul.review-pagination li.page:nth("+index+")").addClass("active");
    this.review_selectedPage = index + 1;
    this.recentReviews(this.review_selectedPage);
  }

  gotoNextMessagePage(){
    if(this.message_totalPage == this.message_selectedPage){
      this.recentMessages(this.message_selectedPage);
    } else {
      $("ul.message-pagination li.page").removeClass('active');
      $("ul.message-pagination li.page:nth("+this.message_selectedPage+")").addClass("active");
      this.message_selectedPage += 1;
      this.recentMessages(this.message_selectedPage);
    }
  }
  gotoBeforeMessagePage(){
    if(this.message_selectedPage == 1){
      this.recentMessages(this.message_selectedPage);
    } else {
      $("ul.message-pagination li.page").removeClass('active');
      this.message_selectedPage = this.message_selectedPage - 1;
      $("ul.message-pagination li.page:nth("+(this.message_selectedPage - 1)+")").addClass("active");
      this.recentMessages(this.message_selectedPage);
    }
  }

  gotoMessagePage(index:number){
    $("ul.message-pagination li.page").removeClass('active');
    $("ul.message-pagination li.page:nth("+index+")").addClass("active");
    this.message_selectedPage = index + 1;
    this.recentMessages(this.message_selectedPage);
  }
}
