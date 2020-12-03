import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import settings from '../../settings';
import {WishList} from 'src/app/models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }

  addItemWishList(wish:WishList){
		return this.http.post(`${settings.apinetcore.urlServer}WishList/add_wishlist`,wish, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		});
	}
}
