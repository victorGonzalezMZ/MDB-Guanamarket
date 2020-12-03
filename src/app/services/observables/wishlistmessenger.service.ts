import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlistmessengerService {

  private subject$ = new Subject<any>();
  constructor() { }

  /**
	 * Método para publicación del Observable
	 * @param criterio 
	 */
	sendProductAlWishList(product:any) {
		this.subject$.next(product);
	}
	/**
	 * Método para subcribirnos al Observable
	 */
	onListenProductInWishList(): Observable<any> {
		return this.subject$.asObservable();
	}

}
