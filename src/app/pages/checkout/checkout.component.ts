import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cart } from 'src/app/models/cart';
import { CheckoutService } from 'src/app/services/core/checkout.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { ShoppingcartService } from 'src/app/services/core/shoppingcart.service';
import { UsersService } from 'src/app/services/core/users.service';
import Swal from 'sweetalert2';



@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

	nick: any;
	cartList: Cart[] = [];
	amountPay: number = 0;
	code_acept: any = '';
	newPay: number = 0;
	totalItems:any;
	
	public checkoutForm: FormGroup = this.fb.group({
		checkoutName: [],
		checkoutApellidos: [],
		checkoutemail: [],
		checkoutaddress: [],
		checkoutState: [],
		checkoutCity: [],
		checkoutCountry: [],
		checkoutZip: [],
		paymentMethod: [],
		cc_name: [],
		cc_number: [],
		cc_expiration: [],
		cc_cvv: []
	});
	public CodePromoForm: FormGroup = this.fb.group({
		code_promotion: []
	});
	constructor(private fb: FormBuilder, private router: ActivatedRoute, private checkoutSvc: CheckoutService,
		private productsSvc: ProductsService,
		private svcCarritoRed : ShoppingcartService,
		private jwtHelper: JwtHelperService,
		private svcUser: UsersService) {
		this.router.params.subscribe(params => {
			
		});
	}

	ngOnInit(): void {
		this.totalItems = 0;
		
		this.getListado();
	}

	getListado(){
		if(!this.isLogueadoUser()){
			this.getList_LOCAL();
		}else{
			this.getCheckout();
			this.getList_RED();
		}
	}

	isLogueadoUser(){
		const token = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			return true;
		}
		return false;
	}

	getCheckout() {

		this.nick = localStorage.getItem("Nick");
		
	
		this.svcUser.getUserByNick(this.nick).subscribe((data: any) => {

			this.checkoutForm.setValue({
				checkoutName:data.user.firstName,
				checkoutApellidos: data.user.lastname,
				checkoutemail: data.user.email,
				checkoutaddress: data.user.address,
				checkoutState: data.user.state,
				checkoutCity: data.user.city,
				checkoutZip: data.user.zip,
				checkoutCountry: data.user.country,
				paymentMethod: [],
				cc_name: '',
				cc_number: [],
				cc_expiration: [],
				cc_cvv: []
			});
		});
	}

	registerCheckout() {
		const obj = {
			// "Nick":[ localStorage.getItem("Nick") || ''],
			"checkoutName": this.checkoutForm.value.checkoutName,
			"checkoutApellidos": this.checkoutForm.value.checkoutApellidos,
			"checkoutemail": this.checkoutForm.value.checkoutemail,
			"checkoutaddress": this.checkoutForm.value.checkoutaddress,
			"checkoutcountry": this.checkoutForm.value.checkoutcountry,
			"checkoutState": this.checkoutForm.value.checkoutState,
			"checkoutZip": this.checkoutForm.value.checkoutZip,
			"paymentMethod": this.checkoutForm.value.paymentMethod,
			"cc_name": this.checkoutForm.value.cc_name,
			"cc_number": this.checkoutForm.value.cc_number,
			"cc_expiration": this.checkoutForm.value.cc_expiration,
			"cc_cvv": this.checkoutForm.value.cc_cvv
		};
		console.log(JSON.stringify(obj));
		this.checkoutSvc.insertCheckout(obj).subscribe(response => {
			console.log(obj);
			if (response > 0) {
				Swal.fire(
					'Bien hecho!',
					`Tu Proceso de pago fue aceptado de ${response} correctamente!`,
					'success'
				)
			}
		}, err => {
			console.log(err);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${JSON.stringify(err)}`,
			});
		});

	}

	getList_LOCAL() {

		let cartItems = [];
		cartItems = JSON.parse(localStorage.getItem("carrito"));
		this.amountPay = 0;
		this.cartList = [];
		for (let i in cartItems) {
			this.productsSvc.getProduct(cartItems[i].Id_Product).subscribe((data: any) => {
				console.log(data.product.seelingPrice);
				const obj: Cart = new Cart(
					data.product.id,
					data.product.brand,
					data.product.title,
					data.product.seelingPrice,
					data.product.imagen,
					cartItems[i].Quantity,
					data.product.seelingPrice * cartItems[i].Quantity
				);
				this.totalItems+= obj.quantity;
				this.amountPay += data.product.seelingPrice * cartItems[i].Quantity;
				this.newPay = this.amountPay;
				this.cartList.push(obj);
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


	applyCode() {

		this.checkoutSvc.validCodePromo(this.CodePromoForm.value.code_promotion).subscribe((descount: number) => {

			if (descount > 0) {

				this.code_acept = this.CodePromoForm.value.code_promotion;
				this.newPay = this.amountPay - (this.amountPay * descount) / 100;
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: `El codigo tiene ${descount}% descuento`,
					showConfirmButton: false,
					timer: 1500
				})
			}
			else {
				Swal.fire({
					icon: 'error',
					title: 'El codigo no tiene descuento.',
					text: '',
				});
			}
		}, err => {
			console.log(err);
			Swal.fire({
				icon: 'error',
				title: 'El codigo tiene no tiene descuento.',
				text: '',
			});
		});
	}

}
