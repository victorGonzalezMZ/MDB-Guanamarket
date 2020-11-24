import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

	@Input() products: any[] = [];
	public dataSet: any = {};

	constructor(private router: Router) {
		this.dataSet = {
			starSize: 5,
			labelsStyle: {
				background: '#3F51B5',
				color: '#f8f8f8',
			},
			showNumber: false,
			labels: ["Bad", "Not Bad", "Average", "Good", "Best",],
			colors: ["#ff4081", "#ff4081", "#ff4081", "#ff4081 ", "#ff4081"]
		}
	}

	ngOnInit(): void {

	}

	viewProduct(item: any) {
		let Id;

		Id = item.id;

		this.router.navigate(['/product-detail', Id]);

	}

}
