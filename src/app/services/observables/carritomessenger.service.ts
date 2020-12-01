import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CarritomessengerService {

	private subject$ = new Subject<any>();
  	constructor() { }


  	/**
	 * Método para publicación del Observable
	 * @param criterio 
	 */
	sendProdutAlCarrito(product:any) {
		this.subject$.next(product);
	}
	/**
	 * Método para subcribirnos al Observable
	 */
	onListenProductInCarrito(): Observable<any> {
		return this.subject$.asObservable();
  }
  
}
