import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MapsAPILoader, LatLngLiteral, AgmCoreModule } from '@agm/core';
import { GlobalService } from '../../service/global.service';
import { ApiService } from '../../service/api.service';

import * as Ladda from 'ladda';
declare var $:any;
declare const google: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  @ViewChild('search') public searchElement: ElementRef;
  
  addressArray: google.maps.GeocoderAddressComponent[];

  fullName = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl();
  address = new FormControl();
  website = new FormControl();
  facebook = new FormControl();
  twitter = new FormControl();
  instagram = new FormControl();
  linkedin = new FormControl();
  pinterest = new FormControl();
  file = new FormControl();
  uploadFile: File = null;
  imageBaseURL: string;

  line1:string;
  line2:string;
  postal_code:string;
  country:string;
  city:string;

  token:string;

  // Profile Info
  profile_fullName:string;
  profile_phone:string;
  profile_email:string;
  profile_country:string;
  profile_facebook:string;
  profile_twitter:string;
  profile_instagram:string;
  profile_linkedin:string;
  profile_pinterest:string;

  dropify: any;

  // change password;
  current_pwd = new FormControl();
  new_pwd = new FormControl();
  confirm_pwd = new FormControl();

  selectedMain:string;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private api: ApiService,
    public global: GlobalService,
  ) { }

  ngOnInit() {
    $("#side-menu").metisMenu();
    this.selectedMain = "profile";
    // Initialize the map address autocomplete
    this.mapsAPILoader.load().then(
			() => {
				let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types: ['address']});
				autocomplete.addListener('place_changed', () => {
					this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
						if (place.geometry === undefined || place.geometry === null) {
							
							return;
            }
            
            this.addressArray = place.address_components;
            this.line1 = place.formatted_address;
            this.line2 = place.formatted_address;

            this.retriveAddressComponents('postal_code');
            this.retriveAddressComponents('country');
            this.retriveAddressComponents('locality');
					});
				});
			}
    );

    // Get profile
    this.getProfile();
  }
  
  ngAfterViewInit(){
    Ladda.bind( 'button[type=submit]', { timeout: 2000 } );
    Ladda.bind( 'button.remove_avatar', { timeout: 2000 } );
    
  }
  getProfile(){
    return this.api.getProfile().subscribe(
        data => this.handleProfileResponse(data),
        error => this.handleError(error)
    );
  }
  
  handleFileInput(files: FileList) {
    this.uploadFile = <File>files.item(0);
  }

  retriveAddressComponents(type: any) {
    let res =  this.addressArray.find(address_components => address_components.types[0] === type);
    
    switch(type) {
      case "postal_code":
        this.postal_code = res.long_name;
        break;
      case "country":
        this.country = res.long_name;
        break;
      case "locality":
        this.city = res.long_name;
      default:
        // code block
    }
  }
  onSubmit(){

    this.token = localStorage.getItem("token");
    return this.api.updateProfile({
        fullName: this.fullName.value,
        phone: this.phone.value,
        website: this.website.value,
        facebook: this.facebook.value,
        instagram: this.instagram.value,
        linkedin: this.linkedin.value,
        twitter: this.twitter.value,
        pinterest: this.pinterest.value,
        address: [
          {
            line1: this.line1,
            line2: this.line1,
            country: this.country,
            city: this.city,
            postalCode: this.postal_code
          }
        ]

    }, this.token).subscribe(
        data => this.handleResponse(data, "updateProfile"),
        //error => this.handleError(error)
    );

  }

  onUpdateAvatar(){
    let user_id = localStorage.getItem("user_id");
    if(this.uploadFile == null){
      $.toast({
        heading: "Warning", 
        text: 'Select image to upload!', 
        position: 'top-right', 
        bgColor: "#ffae42",
        icon: 'success'
      });
      return;
    }
    return this.api.uploadAvatar(this.uploadFile, user_id).subscribe(
        data => this.handleResponse(data, "uploadAvatar"),
        error => this.handleError(error)
    );
  }
  handleResponse(data:any, type:string){
    switch(type){
      case "updateProfile":
        this.setProfile(data.data);
        $.toast({
          heading: "Success", 
          text: 'Updated profile Successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        break;
      case "removeAvatar":
        localStorage.setItem("user_avatar", 'assets/images/users/default-avatar.jpg');
        this.global.emitLocaleChange(true);
        $.toast({
          heading: "Success", 
          text: 'Removed avatar successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        break;
      case "uploadAvatar":
        localStorage.setItem("user_avatar", data.data.imageUrl);
        this.global.emitLocaleChange(true);
        $.toast({
          heading: "Success", 
          text: 'Uploaded avatar successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        break;
      case "changePassword":
        $.toast({
          heading: "Success", 
          text: 'Changed password successfully!', 
          position: 'top-right', 
          bgColor: "#4BB543",
          icon: 'success'
        });
        this.resetPasswordForm();
        break;
      default:
        break;
    }
  }
  handleProfileResponse(data: any){
    console.log(data);
    // Set profile info
    this.profile_fullName = data.data.fullName;
    this.profile_phone = data.data.phone;
    this.profile_email = data.data.email;
    this.profile_country = data.data.address[0].country;
    this.profile_facebook = data.data.facebook;
    this.profile_twitter = data.data.twitter;
    this.profile_instagram = data.data.pinterest;
    this.profile_linkedin = data.data.linkedin;
    this.profile_pinterest = data.data.pinterest;

    // Set update profile form
    this.fullName.setValue(data.data.fullName);
    this.phone.setValue(data.data.phone);
    this.address.setValue(data.data.address[0].line1);
    this.website.setValue(data.data.website);
    this.facebook.setValue(data.data.facebook);
    this.twitter.setValue(data.data.twitter);
    this.instagram.setValue(data.data.instagram);
    this.linkedin.setValue(data.data.linkedin);
    this.pinterest.setValue(data.data.pinterest);
    this.line1 = data.data.address[0].line1;
    this.line2 = data.data.address[0].line2;
    this.postal_code = data.data.address[0].postalCode;
    this.city = data.data.address[0].city;
    this.country = data.data.address[0].country;

    // set avatar pic
    if(data.data.avatar != null){
      
      $("#listing-image").addClass('dropify');
      $("#listing-image").attr("data-default-file", data.data.avatarPic);
      $("#listing-image").attr("image-id", data.data.avatar.id);
    }
    
    this.dropify = $('.dropify').dropify();
  }
  
  remove(){
    this.dropify = this.dropify.data('dropify');
    
    this.dropify.resetPreview();
    this.dropify.clearElement();
    return this.api.deleteAvatar().subscribe(
      data => this.handleResponse(data, "removeAvatar"),
      error => this.handleError(error)
    );
  }

  setProfile(data:any){
    this.profile_fullName = data.fullName;
    this.profile_phone = data.phone;
    this.profile_email = data.email;
    this.profile_country = data.address[0].country;
  }

  resetPasswordForm(){
    this.confirm_pwd.setValue("");
    this.current_pwd.setValue("");
    this.new_pwd.setValue("");
  }
  // submit change password
  onChangePassword(){
    let data = {
      oldPassword: this.current_pwd.value,
      password: this.new_pwd.value,
      confirmPassword: this.confirm_pwd.value
    };
    return this.api.changeProfilePassword(data).subscribe(
      data => this.handleResponse(data, "changePassword"),
      error => this.handleError(error)
    );
  }

  handleError(error: any){
    this.resetPasswordForm();
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
