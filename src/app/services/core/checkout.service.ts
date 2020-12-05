import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import settings from 'src/app/settings';

@Injectable({
	providedIn: 'root'
})
export class CheckoutService {

	constructor(private http: HttpClient) { }

	getcheckout(nick: any) {
		return this.http.get(`${settings.apinetcore.urlServer}checkout/${nick}`);
	}
	getUserbyName(nick: string) {
		return this.http.post(`${settings.apinetcore.urlServer}checkout/getchkUserByNick/`, JSON.stringify(nick), {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}
	/**
	 * INSERTAR checkout --> ENVIAR JSON
	 */
	insertCheckout(obj: any) {
		return this.http.post(`${settings.apinetcore.urlServer}checkout`, obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}
	/**
	 *validar codigo promocion --> ENVIAR JSON
	 */
	validCodePromo(code: string) {
		return this.http.post(`${settings.apinetcore.urlServer}checkout/validCodePromo`, JSON.stringify(code), {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

}
