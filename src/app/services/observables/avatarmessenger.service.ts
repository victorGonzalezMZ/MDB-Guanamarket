import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AvatarmessengerService {

  private subject$ = new Subject<string>();

  constructor() { }

   
	sendChangeAvatar(imagen:string) {
		this.subject$.next(imagen);
	}
	
	onListenChangeAvar(): Observable<string> {
		return this.subject$.asObservable();
  	}
  
}
