import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {

	constructor(private http: HttpClient) { }

	getCategoriesSelect() {
		return this.http.get(`${settings.apinetcore.urlServer}category/GetCategoriesBySelect`);
	}

	getCategories() {
		return this.http.get(`${settings.apinetcore.urlServer}category`);
	}


}
