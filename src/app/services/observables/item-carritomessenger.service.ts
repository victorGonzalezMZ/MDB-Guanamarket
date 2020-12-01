import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemCarritomessengerService {

  private subject$ = new Subject<number>();
  constructor() { }

	/**
	 * Método para publicación del Observable
	 * @param noItems
	 */
	sendNoItems(noItems:number) {
		this.subject$.next(noItems);
	}
	/**
	 * Método para subcribirnos al Observable
	 */
	onListenNoItems(): Observable<number> {
		return this.subject$.asObservable();
	}
}
