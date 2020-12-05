import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CheckoutService } from 'src/app/services/core/checkout.service';
import { ProductsService } from 'src/app/services/core/products.service';
import Swal from 'sweetalert2';
import { Cart } from 'src/app/models/cart';
import settings from 'src/app/settings';
import { ShoppingcartService } from 'src/app/services/core/shoppingcart.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

	cartList: Cart[] = [];
	amountPay:number = 0;
	totalItems:any;

	imagesUrl = settings.apinode.urlServer + 'get-image-product/';


	constructor(private checkoutSvc: CheckoutService,
				private jwtHelper: JwtHelperService,
				private productsSvc: ProductsService,
				private svcCarritoRed : ShoppingcartService) { }


	ngOnInit(): void {
		this.totalItems = 0;
		this.getListado();
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
				
				this.totalItems+= obj.quantity;
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
						
					this.totalItems+= obj.quantity;
					this.amountPay+= data.product.seelingPrice*cartItems[i].quantity;
					this.cartList.push(obj);
					this.cartList.sort((a, b) => (a.title > b.title) ? 1 : -1)	
				
				});
			}	
		});

	}

	registerCheckout(form: NgForm) {

		console.log(form);

		const obj = {
			"Nick": [localStorage.getItem("Nick") || ''],
			"checkoutName": form.value.checkoutName,
			"checkoutApellidos": form.value.checkoutApellidos,
			"checkoutemail": form.value.checkoutemail,
			"checkoutaddress": form.value.checkoutaddress,
			"checkoutcountry": form.value.checkoutcountry,
			"checkoutState": form.value.checkoutState,
			"checkoutZip": form.value.checkoutZip,
			"paymentMethod": form.value.paymentMethod,
			"cc_name": form.value.cc_name,
			"cc_number": form.value.cc_number,
			"cc_expiration": form.value.cc_expiration,
			"cc_cvv": form.value.cc_cvv
		};



		this.checkoutSvc.insertCheckout(obj).subscribe(response => {
			console.log(obj);
			if (response > 0) {
				Swal.fire(
					'Bien hecho!',
					`Tu Porceso de pago fue aceptado de ${response} correctamente!`,
					'success'
				)
			}
		}, err => {
			console.log(err);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${err}`,
			});
		});
	}

	isLogueadoUser(){
		const token = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			return true;
		}
		return false;
	}

}
