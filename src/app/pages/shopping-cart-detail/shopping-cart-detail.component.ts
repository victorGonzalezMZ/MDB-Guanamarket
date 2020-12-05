import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/core/products.service';
import { Cart } from 'src/app/models/cart';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';
import settings from 'src/app/settings';
import { ShoppingcartService } from 'src/app/services/core/shoppingcart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-shopping-cart-detail',
	templateUrl: './shopping-cart-detail.component.html',
	styleUrls: ['./shopping-cart-detail.component.scss']
})
export class ShoppingCartDetailComponent implements OnInit {


	cartList: Cart[] = [];
	amountPay:number = 0;
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	subscription$: Subscription;
	
	
	constructor(private productsSvc: ProductsService,
				private svcCarrito: CarritomessengerService,
				private svcCarritoRed : ShoppingcartService,
				private jwtHelper: JwtHelperService,
				private router: Router) {

		this.subscription$ = this.svcCarrito.onListenFinishedProductInCarrito().subscribe((item:any)=>{
			this.getListado();
		})

		
	
	 }


	ngOnInit(): void {
		this.getListado();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		
	}

	isLogueadoUser(){
		const token = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			return true;
		}
		return false;
	}

	getListado(){

		if(!this.isLogueadoUser())
			this.getList_LOCAL();
		else
			this.getList_RED();
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
				this.cartList.sort((a, b) => (a.title > b.title) ? 1 : -1)	
			});
		}
	
	}

	getList_RED(){
		let cartItems = [];

		cartItems = JSON.parse(localStorage.getItem("carrito"));
		this.amountPay= 0;
		this.cartList = [];
		
		this.svcCarritoRed.getAllItemsShopping(parseInt(sessionStorage.getItem("Id_User"))).subscribe((data:any)=>{
			cartItems = data;

			for (let i in cartItems) {
				this.productsSvc.getProduct(cartItems[i].iD_Product).subscribe((data: any) => {
					const obj:Cart = new Cart(
						data.product.id,
						data.product.brand,
						data.product.title,
						data.product.seelingPrice,
						data.product.imagen,
						cartItems[i].quantity,
						data.product.seelingPrice*cartItems[i].quantity
					);
	
					this.amountPay+= data.product.seelingPrice*cartItems[i].quantity;
					this.cartList.push(obj);
					this.cartList.sort((a, b) => (a.title > b.title) ? 1 : -1)	
				});
			}	
		});

	}
	updateProduct(item:any,inputQuantity:any){
		item.Quantity =parseInt(inputQuantity["value"]);
		this.svcCarrito.sendUpdateAlCarrito(item);
		
	}

	deleteProduct(item:any){
		this.svcCarrito.sendProductDeleteAlCarrito(item);

	}

	irPagar(){
		this.router.navigateByUrl('/checkout');
	}



}
