import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private http: HttpClient) { }

	authenticateUser(obj:any){

		return this.http.post(`${settings.apinetcore.urlServer}login`,
			obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});

	}


	refreshToken(credentials: any) {
		return this.http.post(`${settings.apinetcore.urlToken}token/refresh`, credentials, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			}),
			observe: 'response'
		}).toPromise();
	}

}
