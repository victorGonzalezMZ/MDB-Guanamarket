import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import settings from '../../settings';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
	/** */

	GetTop3NewProducts(){
		return this.http.get(`${settings.apinetcore.urlServer}product/GetTop3NewProducts`);
	}

	GetTop3Random(){
		return this.http.get(`${settings.apinetcore.urlServer}product/GetTop3Random`);
	}

	GetTop3ByCategory(category:string,id:number){
		return this.http.get(`${settings.apinetcore.urlServer}product/GetTop3ByCategory/${category}/${id}`);
	}
	getAllProducts() {
		return this.http.get(`${settings.apinetcore.urlServer}product`);
	}
	getProduct(id:any){
		return this.http.get(`${settings.apinetcore.urlServer}product/${id}`);
	}

	getAllProductsByCategory(category:string){
		return this.http.get(`${settings.apinetcore.urlServer}product/GetProductByCategory/${category}`);
	}

	getAllProductsBySearch(search:string){
		return this.http.get(`${settings.apinetcore.urlServer}product/GetProductBySearch/${search}`);	
	}

	/**
	 * ELIMINAR PRODUCTO {Id}
	 */
	deleteProduct(id:number){
		return this.http.delete(`${settings.apinetcore.urlServer}product/${id}`);
	}

	/**
	 * INSERTAR PRODUCTO --> ENVIAR JSON
	 */
	insertProduct(obj:any){
		return this.http.post(`${settings.apinetcore.urlServer}product`,obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	updateProduct(obj:any){
		return this.http.put(`${settings.apinetcore.urlServer}product`,obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}
	getAllProductsByParams(obj:any){
		return this.http.post(`${settings.apinetcore.urlServer}product/GetAllProductsByParamsPost`,obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}
}
