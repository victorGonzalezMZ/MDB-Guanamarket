import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import settings from '../../settings';
import { WishList } from 'src/app/models/wishlist';

@Injectable({
	providedIn: 'root'
})
export class WishListService {

	constructor(private http: HttpClient) { }

	addItemWishList(wish: WishList) {
		return this.http.post(`${settings.apinetcore.urlServer}WishList/add_wishlist`, wish, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}

	removeItemWishList(wish: WishList) {
		return this.http.post(`${settings.apinetcore.urlServer}WishList/remove_wishlist`, wish);
	}

	getAllItemsWishList(id:number) {
		return this.http.get(`${settings.apinetcore.urlServer}WishList/get_wishlist_products/${id}`);
	}

	getItemsbyOrder(order:string,id_user:number) {
		return this.http.get(`${settings.apinetcore.urlServer}WishList/get_wishlist_products_byorder/${id_user}/${order}`);
	}

	SearchWishList_Products(id:number,search:string){
		return this.http.get(`${settings.apinetcore.urlServer}WishList/SearchWishList_Products/${id}/${search}`);
	}
}
