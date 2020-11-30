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

	getCategory(id:number){
		return this.http.get(`${settings.apinetcore.urlServer}category/${id}`);
	}

	getCategories() {
		return this.http.get(`${settings.apinetcore.urlServer}category`);
	}

	getCategoriesBySearch(search:string){
		return this.http.get(`${settings.apinetcore.urlServer}category/GetCategoriesBySearch/${search}`);	
	}

	/**
	 * INSERTAR CATEGORIA { name: 'nombre'}
	 */
	insertCategory(obj:any){
		return this.http.post(`${settings.apinetcore.urlServer}category`,obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	/**
	 * DELETE CATEGORIA
	 */
	deleteCategory(id:number){
		return this.http.delete(`${settings.apinetcore.urlServer}category/${id}`);
	}

	/**
	 * ACTUALIZAR CATEGORIA
	*/
	updateCategory(obj:any){
		return this.http.put(`${settings.apinetcore.urlServer}category`,obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}


}
