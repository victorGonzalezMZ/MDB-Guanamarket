import { Injectable } from '@angular/core';
import settings from '../../settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getSaleById(obj:any){
    return this.http.post(`${settings.apinode.urlServer}sale/getById`,obj, {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
	});
	
  }

  getAllAdmin(pageNumber:number,pageSize:number=5,criterio:number=0){
	return this.http.get(`${settings.apinode.urlServer}sale/getAll/${pageNumber}/${pageSize}/${criterio}`,{
		headers: new HttpHeaders({
			"Content-Type": "application/json",
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		})
	});
  }

  getAllUserID(pageNumber:number,pageSize:number=5,criterio:number=0,iduser:number){
	return this.http.get(`${settings.apinode.urlServer}sale/getAllUserID/${pageNumber}/${pageSize}/${criterio}/${iduser}`,{
		headers: new HttpHeaders({
			"Content-Type": "application/json"
		})
	});

  }

}
