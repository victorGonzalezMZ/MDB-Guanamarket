import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import settings from 'src/app/settings';

@Component({
	selector: 'app-products-random',
	templateUrl: './products-random.component.html',
	styleUrls: ['./products-random.component.scss']
})
export class ProductsRandomComponent implements OnInit {

	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	@Input() listProductsRandom: any[];

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	viewProduct(item: any) {
		this.router.navigate(['/product-detail', item.id]);
	}
}
