import { Component, Input, OnInit } from '@angular/core';
import settings from 'src/app/settings';

@Component({
	selector: 'app-product-new',
	templateUrl: './product-new.component.html',
	styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {


	@Input() listProductsNew: any[];

	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	constructor() { }

	ngOnInit(): void {

	}

}
