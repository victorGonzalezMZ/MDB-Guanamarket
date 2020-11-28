import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BrandsService {

	constructor(private http: HttpClient) { }

	getAllBrands() {
		return this.http.get(`${settings.apinetcore.urlServer}brand/GetBrandBySelect`);
	}
}
