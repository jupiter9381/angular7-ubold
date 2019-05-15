import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class ApiService {

    private baseURL = 'https://rcm.revolufy.com/';

	constructor(
		private http: HttpClient
	) { }

	login(data) {
		return this.http.post(`${this.baseURL}api/auth/login`, data);
	}
	
	register(data) {
		return this.http.post(`${this.baseURL}api/auth/register?type=ROLE_ADMIN`, data);
	}

	recover(data){
		return this.http.post(`${this.baseURL}api/auth/recover`, data);
	}

	getListingsByKey(data, pageNum){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		}
		let getUrl = "?page=" + pageNum;
		if(data.check_q == true){
			getUrl += "&q="+data.search_q;
		} 
		if(data.check_maxPrice == true){
			getUrl += "&maxPrice="+data.search_maxPrice;
		}
		if(data.check_minPrice == true){
			getUrl += "&minPrice="+data.search_minPrice;
		}
		if(data.check_startDate == true){
			getUrl += "&listingStartDate="+data.search_startDate;
		}
		if(data.check_endDate == true){
			getUrl += "&listingEndDate="+data.search_endDate;
		}
		if(data.check_propertyStyle == true){
			getUrl += "&propertyStyle="+data.search_propertyStyle;
		}
		if(data.check_buildingType == true){
			getUrl += "&buildingType="+data.search_buildingType;
		}
		if(data.check_beds == true){
			getUrl += "&beds="+data.search_beds;
		}
		if(data.check_baths == true){
			getUrl += "&baths="+data.search_baths;
		}
		if(data.check_distance == true){
			getUrl += "&distance="+data.search_distance;
		}
		if(data.check_postalCode == true){
			getUrl += "&postalCode="+data.search_postalCode;
		}
		if(data.check_sortType == true){
			getUrl += "&sortType="+data.search_sortType;
		}
		if(data.check_key == true){
			getUrl += "&key="+data.search_key;
		}
		return this.http.get(`${this.baseURL}api/secured/listing/paged${getUrl}`, httpOptions);
	}

	getReviewsByKey(data, pageNum){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		}
		let getUrl = "?page=" + pageNum;
		if(data.check_q == true){
			getUrl += "&q="+data.search_q;
		} 
		if(data.check_maxRating == true){
			getUrl += "&maxRating="+data.search_maxRating;
		}
		if(data.check_minRating == true){
			getUrl += "&minRating="+data.search_minRating;
		}
		if(data.check_startDate == true){
			getUrl += "&reviewStartDate="+data.search_startDate;
		}
		if(data.check_endDate == true){
			getUrl += "&reviewEndDate="+data.search_endDate;
		}
		if(data.check_sortType == true){
			getUrl += "&listingId="+data.search_listingId;
		}
		if(data.check_sortType == true){
			getUrl += "&sortType="+data.search_sortType;
		}
		if(data.check_key == true){
			getUrl += "&key="+data.search_key;
		}
		return this.http.get(`${this.baseURL}api/secured/review/paged${getUrl}`, httpOptions);
	}

	getMessagesByKey(data, pageNum){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		}
		let getUrl = "?page=" + pageNum;
		if(data.check_q == true){
			getUrl += "&q="+data.search_q;
		} 
		if(data.check_email == true){
			getUrl += "&email="+data.search_email;
		}
		if(data.check_name == true){
			getUrl += "&name="+data.search_name;
		}
		if(data.check_startDate == true){
			getUrl += "&messageStartDate="+data.search_startDate;
		}
		if(data.check_endDate == true){
			getUrl += "&messageEndDate="+data.search_endDate;
		}
		if(data.check_sortType == true){
			getUrl += "&listingId="+data.search_listingId;
		}
		if(data.check_sortType == true){
			getUrl += "&sortType="+data.search_sortType;
		}
		if(data.check_key == true){
			getUrl += "&key="+data.search_key;
		}
		return this.http.get(`${this.baseURL}api/secured/message/paged${getUrl}`, httpOptions);
	}
	
	resetPassword(data){
		return this.http.post(`${this.baseURL}api/auth/reset`, data);
	}

	updateProfile(data, token) {
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.put(`${this.baseURL}api/secured/user/profile/`, data, httpOptions);
	}

	getProfile() {
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/x-www-form-urlencoded',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/user/profile/`,  httpOptions);
	}
	
	changeProfilePassword(data){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.post(`${this.baseURL}api/secured/user/password/`, data, httpOptions);
	}

	uploadAvatar(data, user_id){
		let token = localStorage.getItem("token");
		let formData: FormData = new FormData();
		formData.append("file", data, data.name);
		const httpOptions = {
			headers: new HttpHeaders({
			  	'Authorization': token,
			})
		};
		return this.http.post('https://rcm.revolufy.com/api/secured/file/upload?id='+user_id+"&type=profile&=", formData, httpOptions);
	}
	deleteAvatar(){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  	'Authorization': token,
			})
		};
		return this.http.delete(`${this.baseURL}api/secured/user/avatar/`,  httpOptions);
	}
	createListing(data, token){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.post(`${this.baseURL}api/secured/listing/`, data, httpOptions);
	}

	updateListing(id, data, token){
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.put(`${this.baseURL}api/secured/listing/${id}`, data, httpOptions);
	}

	getAllListings(){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/listing/paged?page=1`, httpOptions);
	}

	getListingById(id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/listing/${id}`, httpOptions);
	}

	uploadListingImage(data, listing_id){
		let token = localStorage.getItem("token");
		let formData: FormData = new FormData();
		formData.append("file", data, data.name);
		const httpOptions = {
			headers: new HttpHeaders({
			  	'Authorization': token,
			})
		};
		return this.http.post('https://rcm.revolufy.com/api/secured/file/upload?id='+listing_id+"&type=listing&=", formData, httpOptions);
	}

	deleteListingImage(image_id, listing_id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.delete(`${this.baseURL}api/secured/listing/${listing_id}/image/${image_id}`, httpOptions);
	}

	// Review
	addReview(data, listing_id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.post(`${this.baseURL}api/public/review/?listing=${listing_id}`, data, httpOptions);
	}

	getAllReviews(){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/review/paged?page=1`, httpOptions);
	}

	getReviewById(id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/review/${id}`, httpOptions);
	}

	publishReview(id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/x-www-form-urlencoded',
			  'Authorization': token
			})
		};
		return this.http.post(`${this.baseURL}api/secured/review/${id}/publish`, {}, httpOptions);
	}

	unpublishReview(id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/x-www-form-urlencoded',
			  'Authorization': token
			})
		};
		return this.http.post(`${this.baseURL}api/secured/review/${id}/unpublish`, {}, httpOptions);
	}

	deleteReview(id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
					'Content-Type':  'application/json',
			  	'Authorization': token,
			})
		};
		return this.http.delete(`${this.baseURL}api/secured/review/${id}`,  httpOptions);
	}

	addMessage(data, listing_id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.post(`${this.baseURL}api/public/message/?listing=${listing_id}`, data, httpOptions);
	}

	getAllMessages(){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/message/paged?page=1`, httpOptions);
	}
	
	getMessageById(id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/message/${id}`, httpOptions);
	}

	deleteMessage(id){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
					'Content-Type':  'application/json',
			  	'Authorization': token,
			})
		};
		return this.http.delete(`${this.baseURL}api/secured/message/${id}`,  httpOptions);
	}

	getActiveListings(pageNumber:number){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			  'Authorization': token
			})
		};
		return this.http.get(`${this.baseURL}api/secured/listing/paged?page=${pageNumber}&visible=true`, httpOptions);
	}

	getRecentReviews(pageNumber:number){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
					'Content-Type':  'application/json',
			  	'Authorization': token,
			})
		};
		return this.http.get(`${this.baseURL}api/secured/review/paged?page=${pageNumber}&sortType=date`,  httpOptions);
	}

	getRecentMessages(pageNumber:number){
		let token = localStorage.getItem("token");
		const httpOptions = {
			headers: new HttpHeaders({
					'Content-Type':  'application/json',
			  	'Authorization': token,
			})
		};
		return this.http.get(`${this.baseURL}api/secured/message/paged?${pageNumber}&sortType=date`,  httpOptions);
	}
}
