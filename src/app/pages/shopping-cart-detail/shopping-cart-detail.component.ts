import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Cart } from 'src/app/models/cart';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';
import settings from '../../settings';

@Component({
	selector: 'app-shopping-cart-detail',
	templateUrl: './shopping-cart-detail.component.html',
	styleUrls: ['./shopping-cart-detail.component.scss']
})
export class ShoppingCartDetailComponent implements OnInit {


	cartList: Cart[] = [];
	amountPay:number = 0;
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	constructor(private productsSvc: ProductsService,
				private svcCarrito: CarritomessengerService) {
		this.getList_LOCAL();
	 }


	ngOnInit(): void {
	
	}

	getList_LOCAL() {

		let cartItems = [];
		cartItems = JSON.parse(localStorage.getItem("carrito"));
		this.amountPay= 0;
		this.cartList = [];
		for (let i in cartItems) {
			this.productsSvc.getProduct(cartItems[i].Id_Product).subscribe((data: any) => {
				const obj:Cart = new Cart(
					data.product.id,
					data.product.brand,
					data.product.title,
					data.product.seelingPrice,
					data.product.imagen,
					cartItems[i].Quantity,
					data.product.seelingPrice*cartItems[i].Quantity
				);

				this.amountPay+= data.product.seelingPrice*cartItems[i].Quantity;
				this.cartList.push(obj);
			});
		}	
	}

	updateProduct(item:any,inputQuantity:any){
		item.Quantity =parseInt(inputQuantity["value"]);
		this.svcCarrito.sendUpdateAlCarrito(item);
		this.getList_LOCAL();
	}

	deleteProduct(item:any){
		this.svcCarrito.sendProductDeleteAlCarrito(item);
		this.getList_LOCAL();
	}



}
