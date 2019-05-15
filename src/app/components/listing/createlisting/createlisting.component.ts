import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

import { ApiService } from '../../../service/api.service';

declare var $:any;
declare const google: any;

@Component({
  selector: 'app-createlisting',
  templateUrl: './createlisting.component.html',
  styleUrls: ['./createlisting.component.css']
})
export class CreatelistingComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;
  addressArray: google.maps.GeocoderAddressComponent[];
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private api: ApiService) { }
  
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

  line1:string;
  line2:string;
  postal_code:string;
  country:string;
  city:string;
  
  token:string;

  ngOnInit() {
    //$("#side-menu").metisMenu();
    $('textarea').froalaEditor();
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

    let data = {
      title: this.title.value,
      details: this.details.value,
      summary: this.summary.value,
      visible: this.visible.value,
      price: this.price.value,
      annualPropertyTaxes: this.annualPropertyTaxes.value,
      priceInterval: this.priceInterval.value,
      landSize: {
        width: this.landwidth.value,
        height: this.landheight.value,
        acres: this.landacres.value
      },
      categories: [],
      images: [],
      tags: [],
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
    return this.api.createListing(data, this.token).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

    this.resetForm();
  }
  ngAfterViewInit(){
  }

  handleResponse(data: any){
    
    console.log(data);
  }
  resetForm(){
    this.title.setValue("");
    this.details.setValue("");
    this.summary.setValue("");
    this.visible.setValue(false);
    this.price.setValue("");
    this.annualPropertyTaxes.setValue("");
    this.priceInterval.setValue("");
    this.landwidth.setValue("");
    this.landheight.setValue("");
    this.landacres.setValue("");
    this.mlsnumber.setValue("");
    this.bedroom.setValue("");
    this.storeys.setValue("");
    this.parking.setValue("");
    this.propertyStyle.setValue("");
    this.heatingType.setValue("");
    this.exteriorFinish.setValue("");
    this.poolType.setValue("");
    this.buildingType.setValue("");
    this.communityName.setValue("");
    this.parkingType.setValue("");
    this.ownership.setValue("");
    this.basementDevelopment.setValue("");
    this.basementType.setValue("");
    this.openHouseStartDate.setValue("");
    this.openHouseEndDate.setValue("");
    this.roomlevel.setValue("");
    this.roomname.setValue("");
    this.roomwidth.setValue("");
    this.roomheight.setValue("");
    this.address.setValue("");
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
