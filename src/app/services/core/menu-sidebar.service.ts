import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient } from '@angular/common/http';



@Injectable({
	providedIn: 'root'
})
export class MenuSidebarService {

	constructor(private http: HttpClient) { }

	getSidebarMenusWithToken(token:string) {
		return this.http.get(`${settings.apinode.urlServer}sidebar/get-sidebar-menu/${token}`);
	}

	getSidebarMenusWithoutToken() {
		return this.http.get(`${settings.apinode.urlServer}sidebar/get-sidebar-menu/`);
	}

}
