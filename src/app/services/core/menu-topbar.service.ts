import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import settings from '../../settings';

@Injectable({
  providedIn: 'root'
})
export class MenuTopbarService {

  constructor(private http: HttpClient) { }

  getItemsMenu() {
		return this.http.get(`${settings.apinode.urlServer}menu`);
  }
   
}
