import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as Ladda from 'ladda';

import { ApiService } from '../../../service/api.service';

declare var $:any;

@Component({
  selector: 'app-tablelisting',
  templateUrl: './tablelisting.component.html',
  styleUrls: ['./tablelisting.component.css']
})
export class TablelistingComponent implements OnInit {

  listings = [];

  // review form
  title = new FormControl();
  message = new FormControl();
  name = new FormControl();
  email = new FormControl();
  website = new FormControl();
  listing_id:any;
  rating:any = 5;

  // message form
  fromEmail = new FormControl();
  toEmail = new FormControl();
  phone = new FormControl();
  subject = new FormControl();


  // search Form
  check_q = new FormControl();
  search_q = new FormControl();
  check_maxPrice = new FormControl();
  search_maxPrice = new FormControl();
  check_minPrice = new FormControl();
  search_minPrice = new FormControl();
  check_sortType = new FormControl();
  search_sortType = new FormControl();
  check_startDate = new FormControl();
  search_startDate = new FormControl();
  check_endDate = new FormControl();
  search_endDate = new FormControl();
  check_propertyStyle = new FormControl();
  search_propertyStyle = new FormControl();
  check_buildingType = new FormControl();
  search_buildingType = new FormControl();
  check_beds = new FormControl();
  search_beds = new FormControl();
  check_baths = new FormControl();
  search_baths = new FormControl();
  check_distance = new FormControl();
  search_distance = new FormControl();
  check_postalCode = new FormControl();
  search_postalCode = new FormControl();
  check_key = new FormControl();
  search_key = new FormControl();

  // paginations
  paginations:any;
  totalPage:number;
  selectedPage:number;

  constructor(private api: ApiService) { }

  ngOnInit() {
    //$("#side-menu").metisMenu();
    this.selectedPage = 1;
    this.getAllListing();
  }


  ngAfterViewInit(){
    Ladda.bind( 'button[type=submit]', { timeout: 2000 } );
    $("#rateBox").rate({
      length: 5,
      value: 5,
      readonly: false,
      size: '32px',
      half: true,
      text:false,
      selectClass: 'fxss_rate_select',
      incompleteClass: 'fxss_rate_no_all_select',
      customClass: 'custom_class',
      callback: function(object){
        this.rating = object.index + 1;
      }
    });
  }

  onSubmit(){
    this.doFilter(1);
  }

  doFilter(pageNum:any){
    let data = {
      check_q: this.check_q.value,
      search_q: this.search_q.value,
      check_maxPrice: this.check_maxPrice.value,
      search_maxPrice: this.search_maxPrice.value,
      check_minPrice: this.check_minPrice.value,
      search_minPrice: this.search_minPrice.value,
      check_sortType: this.check_sortType.value,
      search_sortType: this.search_sortType.value,
      check_startDate: this.check_startDate.value,
      search_startDate: this.search_startDate.value,
      check_endDate: this.check_endDate.value,
      search_endDate: this.search_endDate.value,
      check_propertyStyle: this.check_propertyStyle.value,
      search_propertyStyle: this.search_propertyStyle.value,
      check_buildingType: this.check_buildingType.value,
      search_buildingType: this.search_buildingType.value,
      check_beds: this.check_beds.value,
      search_beds: this.search_beds.value,
      check_baths: this.check_baths.value,
      search_baths: this.search_baths.value,
      check_distance: this.check_distance.value,
      search_distance: this.search_distance.value,
      check_postalCode: this.check_postalCode.value,
      search_postalCode: this.search_postalCode.value,
      check_key: this.check_key.value,
      search_key: this.search_key.value,
    };
    return this.api.getListingsByKey(data, pageNum).subscribe(
      data => this.handleResponse(data, "getListingsByKey"),
      //error => this.handleError(error)
    );
  }
  getAllListing(){
    return this.api.getAllListings().subscribe(
        data => this.handleResponse(data, "getListing"),
        //error => this.handleError(error)
    );
  }
  handleResponse(data:any, type:any){
    switch(type){
      case "getListingsByKey":
        this.listings = data.data.listings;
        if(this.selectedPage == 1){
          this.totalPage = data.data.totalPages;
          this.paginations = [];
          for(let i = 1; i <= this.totalPage; i++){
            this.paginations.push({pageNum: i});
          }
        }
        
        break;
      case "getListing":
        this.listings = data.data.listings;
        this.totalPage = data.data.totalPages;
        this.paginations = [];
        for(let i = 1; i <= this.totalPage; i++){
          this.paginations.push({pageNum: i});
        }
        break;
      case "addReview":
        $.toast({
          heading: "Success", 
          text: 'Added review successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        setTimeout(function(){ $("#review-modal").modal('hide'); }, 1000);
        this.initReview();
        break;
      case "addMessage":
        $.toast({
          heading: "Success", 
          text: 'Added message successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        setTimeout(function(){ $("#message-modal").modal('hide'); }, 1000);
        this.initMessage();
        break;
      default:
        break;
    }
  }

  initReview(){
    this.rating = 5;
    this.title.setValue("");
    this.message.setValue("");
    this.name.setValue("");
    this.email.setValue("");
    this.website.setValue("");
  }

  initMessage(){
    this.fromEmail.setValue("");
    this.toEmail.setValue("");
    this.name.setValue("");
    this.phone.setValue("");
    this.subject.setValue("");
    this.message.setValue("");
  }
  onAddMessage(){
    let data = {
      fromEmail: this.fromEmail.value,
      toEmail: this.toEmail.value,
      name: this.name.value,
      phone: this.phone.value,
      subject: this.subject.value,
      msg: this.message.value
    }

    return this.api.addMessage(data, this.listing_id).subscribe(
      data => this.handleResponse(data, "addMessage"),
      error => this.handleError(error)
    );

    
  }

  onAddReview(){
    let data = {
      title: this.title.value,
      message: this.message.value,
      name: this.name.value,
      email: this.email.value,
      website: this.website.value,
      rating: $(".fxss_rate_select").length
    }

    return this.api.addReview(data, this.listing_id).subscribe(
      data => this.handleResponse(data, "addReview"),
      error => this.handleError(error)
    );

    
  }

  handleError(error){
    if(error.status == 409){
      $.toast({
        heading: "Warning", 
        text: 'You already reviewed this listing.', 
        position: 'top-right', 
        bgColor: "#cc3300",
        icon: 'warning'
      });
      setTimeout(function(){ $("#review-modal").modal('hide'); }, 2000);
      this.initReview();
    }
  }
  setListingId(listingId:any){
    this.listing_id = listingId;
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
