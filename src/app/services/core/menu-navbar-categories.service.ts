import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MenuNavbarCategoriesService {

  constructor(private http: HttpClient) { }

  getCategoryMenus() {
		return this.http.get(`${settings.apinetcore.urlServer}category`);
	}
}
