import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';



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

	registerNewItemSidebar(obj: any){
        return this.http.post(`${settings.apinode.urlServer}sidebar/register-sidebar/`,obj, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        });
 
    }
    registerNewSubItemSidebar(obj: any){
        return this.http.put(`${settings.apinode.urlServer}sidebar/register-subitem-sidebar/`,obj, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        });
 
    }
    getSidebar(id:string){
        return this.http.get(`${settings.apinode.urlServer}sidebar/get-sidebar-byid/${id}`);
    }
    updateItemSidbar(obj:any){
        return this.http.put(`${settings.apinode.urlServer}sidebar/update-sidebar/`,obj, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        });
    }
    deleteItemSidebar(obj:any){
        return this.http.delete(`${settings.apinode.urlServer}sidebar/delete-sidebar/`,obj);
    }
    deleteSubItemSidebar(obj:any){
        return this.http.delete(`${settings.apinode.urlServer}sidebar/delete-subitem-sidebar/`,obj);
    }
}	
