import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import settings from '../../settings';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	constructor(private http: HttpClient) { }

	getAllUsers() {
		let token = localStorage.getItem("jwt");
		return this.http.get(`${settings.apinetcore.urlServer}user`, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	registerNewUser(obj:any){
		return this.http.post(`${settings.apinetcore.urlServer}user`,obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

}
