import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../service/api.service';
import { ToasterConfig } from '../../../../../node_modules/angular2-toaster';
import { ToasterService } from 'angular2-toaster';

import * as Ladda from 'ladda';

declare var $:any;
declare const google: any;

@Component({
  selector: 'app-editlisting',
  templateUrl: './editlisting.component.html',
  styleUrls: ['./editlisting.component.css']
})
export class EditlistingComponent implements OnInit {

  title = new FormControl();
  visible = new FormControl();
  price = new FormControl();
  annualPropertyTaxes = new FormControl();
  priceInterval= new FormControl();
  details = new FormControl();
  summary = new FormControl();
  address= new FormControl();
  landwidth = new FormControl();
  landheight = new FormControl();
  landacres = new FormControl();
  mlsnumber = new FormControl();
  bedroom = new FormControl();
  bathroom = new FormControl();
  storeys = new FormControl();
  parking = new FormControl();
  propertyStyle = new FormControl();
  heatingType = new FormControl();
  exteriorFinish = new FormControl();
  poolType = new FormControl();
  buildingType = new FormControl();
  communityName = new FormControl();
  parkingType = new FormControl();
  ownership = new FormControl();
  basementDevelopment = new FormControl();
  basementType = new FormControl();
  openHouseStartDate = new FormControl();
  openHouseEndDate = new FormControl();
  roomlevel = new FormControl();
  roomname = new FormControl();
  roomwidth = new FormControl();
  roomheight = new FormControl();
  images:any;
  file = new FormControl();

  line1:string;
  line2:string;
  postal_code:string;
  country:string;
  city:string;

  token: string;
  listing_id: number;
  uploadFile: File = null;
  listing_image: string;
  dropify: any;
  imageShown: boolean = false;

  remove_index:number;
  $this = this;

  gallery_images = [];
  toasterConfig: any;
	toasterconfig: ToasterConfig = new ToasterConfig({
		positionClass: 'toast-bottom-right'
  });
  
  constructor(private route: ActivatedRoute, private api: ApiService,
    public toasterService: ToasterService) { }

  ngOnInit() {
    //$("#side-menu").metisMenu();
    
    this.listing_id= this.route.snapshot.params.id;

    // Get listing
    this.getListing(this.listing_id);

  }
  ngAfterViewInit(){
    Ladda.bind( 'button[type=submit]', { timeout: 2000 } );
    
    
    this.dropify = $(".dropify").dropify();
  }
  
  ngAfterViewChecked(){
    Ladda.bind( 'button.remove_listing_avatar', { timeout: 500 } );
  }
  getListing(id:any){
    return this.api.getListingById(id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleFileInput(files: FileList) {
    this.uploadFile = <File>files.item(0);
  }

  onUploadListingImage(){
    if(this.uploadFile == null) return;
    return this.api.uploadListingImage(this.uploadFile, this.listing_id).subscribe(
        data => this.handleUpdateResponse(data, "uploadImage"),
        error => this.handleError(error)
    );
  }


  onSubmit(){
    this.token = localStorage.getItem("token");
    let data = {
      title: this.title.value,
      details: $("textarea.detail-listing").froalaEditor('html.get'),
      summary: $("textarea.summary-listing").froalaEditor('html.get'),
      visible: this.visible.value,
      price: this.price.value,
      annualPropertyTaxes: this.annualPropertyTaxes.value,
      priceInterval: this.priceInterval.value,
      landSize: {
        width: this.landwidth.value,
        height: this.landheight.value,
        acres: this.landacres.value
      },
      images: this.images,
      line1: this.line1,
      line2: this.line2,
      country: this.country,
      city: this.city,
      postalCode: this.postal_code,
      mlsNumber: this.mlsnumber.value,
      bedroom: this.bedroom.value,
      storeys: this.storeys.value,
      parking: this.parking.value,
      propertyStyle: this.propertyStyle.value,
      heatingType: this.heatingType.value,
      exteriorFinish: this.exteriorFinish.value,
      poolType: this.poolType.value,
      buildingType: this.buildingType.value,
      communityName: this.communityName.value,
      parkingType: this.parkingType.value,
      ownership: this.ownership.value,
      basementDevelopment: this.basementDevelopment.value,
      basementType: this.basementType.value,
      openHouseStartDate: this.openHouseStartDate.value,
      openHouseEndDate: this.openHouseEndDate.value,
      rooms: [
        {
          level: this.roomlevel.value,
          name: this.roomname.value,
          roomSize: {
            width: this.roomwidth.value,
            height: this.roomheight.value
          }
        }
      ]
    }
    return this.api.updateListing(this.listing_id, data, this.token).subscribe(
      data => this.handleUpdateResponse(data, "update"),
      error => this.handleError(error)
    );
  }
  handleUpdateResponse(data:any, type:any){
    switch(type){
      case "update":
        $.toast({
          heading: "Success", 
          text: 'Updated Successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        break;
      case "removeImage":
        $.toast({
          heading: "Success", 
          text: 'Removed image successfully!',  
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        this.gallery_images.splice(this.remove_index, 1);
        break;
      case "uploadImage":
        $.toast({
          heading: "Success", 
          text: 'Uploaded image successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        this.images.push(data.data);
        this.dropify = this.dropify.data('dropify');
        this.dropify.resetPreview();
        this.dropify.clearElement();
        this.dropify = $(".dropify").dropify();
        break;
      default:
        break;
    }
    
  }
  handleResponse(data:any){
    let listing = data.data;
    this.title.setValue(listing.title);
    this.details.setValue(listing.details);
    this.summary.setValue(listing.summary);
    this.visible.setValue(listing.visible);
    this.price.setValue(listing.price);
    this.annualPropertyTaxes.setValue(listing.annualPropertyTaxes);
    this.priceInterval.setValue(listing.priceInterval);
    this.landwidth.setValue(listing.landSize.width);
    this.landheight.setValue(listing.landSize.height);
    this.landacres.setValue(listing.landSize.acres);
    this.mlsnumber.setValue(listing.mlsnumber);
    this.bedroom.setValue(listing.bedroom);
    this.storeys.setValue(listing.storeys);
    this.parking.setValue(listing.parking);
    this.propertyStyle.setValue(listing.propertyStyle);
    this.heatingType.setValue(listing.heatingType);
    this.exteriorFinish.setValue(listing.exteriorFinish);
    this.poolType.setValue(listing.poolType);
    this.buildingType.setValue(listing.buildingType);
    this.communityName.setValue(listing.communityName);
    this.parkingType.setValue(listing.parkingType);
    this.ownership.setValue(listing.ownership);
    this.basementDevelopment.setValue(listing.basementDevelopment);
    this.basementType.setValue(listing.basementType);
    this.openHouseStartDate.setValue(listing.openHouseStartDate);
    this.openHouseEndDate.setValue(listing.openHouseEndDate);
    this.roomlevel.setValue(listing.rooms[0].level);
    this.roomname.setValue(listing.rooms[0].name);
    this.roomwidth.setValue(listing.rooms[0].roomSize.width);
    this.roomheight.setValue(listing.rooms[0].roomSize.height);
    this.images = listing.images;

    this.line1 = listing.line1;
    this.line2 = listing.line2;
    this.postal_code = listing.postalCode;
    this.country = listing.country;
    this.city = listing.city;
    this.address.setValue(listing.line1);
    if(listing.images.length > 0){
      this.gallery_images = listing.images;
    }
    
    $("textarea.detail-listing").html(this.details.value);
    $("textarea.summary-listing").html(this.summary.value);

    $('textarea').froalaEditor();
  }

  remove(id: any, index: any){
    this.remove_index = index;
    return this.api.deleteListingImage(id, this.listing_id).subscribe(
      data => this.handleUpdateResponse(data, "removeImage"),
      error => this.handleError(error)
    );
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
