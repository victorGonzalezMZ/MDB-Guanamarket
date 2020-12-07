import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import settings from 'src/app/settings';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	constructor(private http: HttpClient) {}

	uploadImageProduct(formData) {
		//return this.http.post('api/update-image-product', formData);
		return this.http.post(`${settings.apinode.urlServer}product/update-image-product`, formData);
		
	}
	deleteImageProduct(imageName: string) {
		return this.http.delete(`${settings.apinode.urlServer}product/delete-image-product/${imageName}`,{
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}


	uploadImageUser(formData, nick:string) {
		return this.http.post(`${settings.apinode.urlServer}user/update-image-user/${nick}`,formData);
		
		
	}

	deleteImageUser(imageName: string, nick:string) {
		return this.http.delete(`${settings.apinode.urlServer}user/delete-image-user/${imageName}/${nick}`,{
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`
			})
		});
	}


}
