import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import settings from '../../settings';

@Component({
	selector: 'app-productdetail',
	templateUrl: './productdetail.component.html',
	styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {

	product: any = {};
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	constructor(private router: ActivatedRoute, private produtsSvc: ProductsService) {
		this.router.params.subscribe(params => {
			this.getProduct(params['id']);
		});
	}

	ngOnInit(): void {
	}

	getProduct(id: string) {
		this.produtsSvc.getProduct(id).subscribe((data: any) => {
			this.product = data.product;
		})
	}

}
