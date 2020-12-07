import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
	productsAdditional: any[] = [];
	imagesUrl = settings.apinode.urlPhotoServer;

	public quantityForm: FormGroup = this.fb.group({
		Quantity: []
	});


	constructor(private router: ActivatedRoute, 
		private produtsSvc: ProductsService,
		private fb: FormBuilder,
		private svcCarrito: CarritomessengerService,
		private routerLink: Router,) {

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
			this.produtsSvc.GetTop3ByCategory(this.product.category,this.product.id).subscribe((data:any)=>{
				this.productsAdditional = data.listProducts;
			});
		})
	}

	click_addCart(){
		this.product.Quantity =parseInt(this.quantityForm.get("Quantity").value);
		console.log(this.product.Quantity);
		this.svcCarrito.sendProdutAlCarrito(this.product);
	}


	viewProduct(item: any) {
		this.routerLink.navigate(['/product-detail', item.id]);
	}

}
