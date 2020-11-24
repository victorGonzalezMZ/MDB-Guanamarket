import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import settings from '../../settings';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

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
}
