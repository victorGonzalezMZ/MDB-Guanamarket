import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/core/products.service';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';
import settings from '../../settings';

@Component({
	selector: 'app-productdetail',
	templateUrl: './productdetail.component.html',
	styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {

	product: any = {};
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	public quantityForm: FormGroup = this.fb.group({
		Quantity: []
	});


	constructor(private router: ActivatedRoute, 
		private produtsSvc: ProductsService,
		private fb: FormBuilder,
		private svcCarrito: CarritomessengerService) {

		this.router.params.subscribe(params => {
			this.getProduct(params['id']);
			this.quantityForm.setValue({
				Quantity: 1
			})
		});

	}

	ngOnInit(): void {
		
	}

	getProduct(id: string) {
		this.produtsSvc.getProduct(id).subscribe((data: any) => {
			this.product = data.product;
		})
	}

	click_addCart(){
		this.product.Quantity =parseInt(this.quantityForm.get("Quantity").value);
		this.svcCarrito.sendProdutAlCarrito(this.product);
	}

}
