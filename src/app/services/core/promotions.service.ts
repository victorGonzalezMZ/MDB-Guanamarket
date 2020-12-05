import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import settings from 'src/app/settings';

@Injectable({
	providedIn: 'root'
})
export class PromotionsService {

	constructor(private http: HttpClient) { }

	registerNewPromotion(obj: any) {
		return this.http.post(`${settings.apinetcore.urlServer}promotion`, obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	getAllPromotion() {
		return this.http.get(`${settings.apinetcore.urlServer}promotion`);
	}
	deletePromotion(id: any) {
		return this.http.post(`${settings.apinetcore.urlServer}promotion/remove_promotion`, id);
	}
	getPromotion(id: any) {
		return this.http.post(`${settings.apinetcore.urlServer}promotion/getpromotion`, id);
	}
	updatePromotion(obj: any) {
		return this.http.post(`${settings.apinetcore.urlServer}promotion/update_promotion`, obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}
}
