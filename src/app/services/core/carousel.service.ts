import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import settings from '../../settings';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }

  getItemsCarousel() {
    return this.http.get(`${settings.apinode.urlServer}carousel`);
  }
}
