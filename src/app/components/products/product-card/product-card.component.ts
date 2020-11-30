import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import settings from '../../../settings';
@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

	@Input() products: any[] = [];
	public dataSet;
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.dataSet = {
			labelsStyle: {
				background: '#3F51B5',
				color: '#f8f8f8',
			},
			showNumber: false,
			labels: ["Muy Malo", "No tan malo", "Regular", "Bueno", "Excelente",],
			colors: ["#ff4081", "#ff4081", "#ff4081", "#ff4081 ", "#ff4081"],
			starSize: "10" // Set the default Size of component
		}
	}

	viewProduct(item: any) {
		this.router.navigate(['/product-detail', item.id]);
	}

}
