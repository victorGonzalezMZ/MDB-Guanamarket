import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	constructor(private http: HttpClient) {}

	uploadImageProduct(formData) {
		return this.http.post('api/update-image-product', formData);
	}
	deleteImageProduct(imageName: string) {
		return this.http.delete(`api/delete-image-product/${imageName}`,{
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}


	uploadImageUser(formData, nick:string) {
		return this.http.post(`api/update-image-user/${nick}`, formData);
	}

	deleteImageUser(imageName: string, nick:string) {
		return this.http.delete(`api/delete-image-user/${imageName}/${nick}`,{
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}


}
