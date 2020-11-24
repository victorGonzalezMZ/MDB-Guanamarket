import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuTopbarService {

  constructor(private http: HttpClient) { }

  getItemsMenu() {
		return this.http.get("api/menus");
  }
   
}
