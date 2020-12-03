import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient } from '@angular/common/http';



@Injectable({
	providedIn: 'root'
})
export class MenuSidebarService {

	constructor(private http: HttpClient) { }

	getSidebarMenusWithToken(token:string) {
		return this.http.get(`api/get-sidebar-menu/${token}`);
	}
	getSidebarMenusWithoutToken() {
		return this.http.get(`api/get-sidebar-menu/`);
	}

}
