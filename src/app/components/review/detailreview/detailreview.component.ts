import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';

import * as Ladda from 'ladda';

declare var $:any;

@Component({
  selector: 'app-detailreview',
  templateUrl: './detailreview.component.html',
  styleUrls: ['./detailreview.component.css']
})


export class DetailreviewComponent implements OnInit {

  // review form
  title = new FormControl();
  message = new FormControl();
  name = new FormControl();
  email = new FormControl();
  website = new FormControl();
  listing_id:any;
  rating:any = 5;
  visible:boolean = false;

  // review id
  review_id: any;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.review_id= this.route.snapshot.params.id;
    this.getReview(this.review_id);
    $("#side-menu").metisMenu();
  }

  ngAfterViewInit(){
    Ladda.bind( 'button.publish_btn', { timeout: 2000 } );
    Ladda.bind( 'button.unpublish_btn', { timeout: 2000 } );
  }

  getReview(id){
    return this.api.getReviewById(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data:any){
    this.title.setValue(data.data.title);
    this.message.setValue(data.data.message);
    this.name.setValue(data.data.name);
    this.email.setValue(data.data.email);
    this.website.setValue(data.data.website);
    this.visible = data.data.visible;

    this.setPublishedStatus();
    
    $("#rateBox").rate({
      length: 5,
      value: data.data.rating,
      readonly: true,
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
  setPublishedStatus(){
    setTimeout(() => {
      $(".publish").removeClass("nonvisible");
      $(".unpublish").removeClass("nonvisible");
      if(this.visible == false){
        $(".unpublish").addClass("nonvisible");
      } else {
        $(".publish").addClass("nonvisible");
      }
    }, 2000);
    
  }
  publish(){
    
    Ladda.bind( 'button.publish_btn', { timeout: 2000 } );
    return this.api.publishReview(this.review_id).subscribe(
      data => this.handleActionResponse(data, "publish"),
      error => this.handleError(error)
    );
  }

  unpublish(){
    
    Ladda.bind( 'button.unpublish_btn', { timeout: 2000 } );
    return this.api.unpublishReview(this.review_id).subscribe(
      data => this.handleActionResponse(data, "unpublish"),
      error => this.handleError(error)
    );
  }

  handleActionResponse(data:any, type:string){
    switch(type) {
      case "publish":
        $.toast({
          heading: "Success", 
          text: 'Published Successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        this.visible = !this.visible;
        this.setPublishedStatus();
        break;
      case "unpublish":
        $.toast({
          heading: "Success", 
          text: 'Unpublished Successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        this.visible = !this.visible;
        this.setPublishedStatus();
        break;
      default:
        // code block
    }
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
