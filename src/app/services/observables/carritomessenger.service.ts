import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CarritomessengerService {

	private subject$ = new Subject<any>();
	private subjectDelete$ = new Subject<any>();
	private subjectUpdate$ = new Subject<any>();

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

	sendProductDeleteAlCarrito(item:any){
		this.subjectDelete$.next(item);
	}

	onListenDeleteProductInCarrito(): Observable<any> {
		return this.subjectDelete$.asObservable();
	}
	  
	sendUpdateAlCarrito(item:any){
		this.subjectUpdate$.next(item);
	}

	onListenUpdateProductInCarrito(): Observable<any> {
		return this.subjectUpdate$.asObservable();
	}



  
}
