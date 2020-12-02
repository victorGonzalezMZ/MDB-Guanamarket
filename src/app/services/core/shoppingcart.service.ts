import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import settings from '../../settings';
import { ShoppingCart} from 'src/app/models/shoppingcart';

@Injectable({
	providedIn: 'root'
})
export class ShoppingcartService {

	constructor(private http: HttpClient) { }

	getAllItemsShopping(id:number){
		return this.http.get(`${settings.apinetcore.urlServer}shoppingCart/get_shoppingcart_products/${id}`);
	}

	addItemShoppingCart(cart:ShoppingCart){
		return this.http.post(`${settings.apinetcore.urlServer}shoppingCart/add_Shoppingcart`,cart, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	addItemShoppingCartLocalToRed(cart:ShoppingCart){
		return this.http.post(`${settings.apinetcore.urlServer}shoppingCart/add_Shoppingcart_fromlocal`,cart, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	updateItemShoppingCart(cart:ShoppingCart){
		return this.http.put(`${settings.apinetcore.urlServer}shoppingCart/update_Shoppingcart_quantity`,cart, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	removeShoppingCart(cart:ShoppingCart){
		return this.http.post(`${settings.apinetcore.urlServer}shoppingCart/remove_Shoppingcart`,cart, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	
}
