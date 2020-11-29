import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class LoginmessengerService {

	private subject$ = new Subject<boolean>();

	constructor() { }


	/**
	 * Método para publicación del Observable
	 * @param criterio 
	 */
	sendCriterio(criterio:boolean) {
		this.subject$.next(criterio);
	}
	/**
	 * Método para subcribirnos al Observable
	 */
	onListenCriterio(): Observable<boolean> {
		return this.subject$.asObservable();
	}


}
