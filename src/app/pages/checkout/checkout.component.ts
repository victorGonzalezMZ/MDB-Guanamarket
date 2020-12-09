import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cart } from 'src/app/models/cart';
import { CheckoutService } from 'src/app/services/core/checkout.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { ShoppingcartService } from 'src/app/services/core/shoppingcart.service';
import { UsersService } from 'src/app/services/core/users.service';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';
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
	newPay: number;
	totalItems:any;
	validDatos:boolean;
	descountPorcentaje:any;
	metodoPago:any;

	public checkoutForm: FormGroup = this.fb.group({
		checkoutName: [],
		checkoutApellidos: [],
		checkoutemail: [],
		checkoutaddress: [],
		checkoutState: [],
		checkoutCity: [],
		checkoutCountry: [],
		checkoutZip: [],
		checkoutphone: [],
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
		private svcUser: UsersService,
		private routerLink: Router,
		private svcPay: LoginmessengerService,) {

		
	}

	ngOnInit(): void {
		this.totalItems = 0;
		this.validDatos = false;
		this.getListado();
		this.newPay = 0;
		this.descountPorcentaje = 0.0;
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

	onChangePago(id:any){
		this.metodoPago = id;
	}

	getCheckout() {

		this.nick = sessionStorage.getItem("nick");
		
		this.svcUser.getUserByNick(this.nick).subscribe((data: any) => {
			this.revisarDatosUsuario(
				data.user.address,data.user.state,data.user.city,data.user.zip,data.user.country,data.user.phone
			)
			this.checkoutForm.setValue({
				checkoutName:data.user.firstName,
				checkoutApellidos: data.user.lastname,
				checkoutemail: data.user.email,
				checkoutaddress: data.user.address,
				checkoutState: data.user.state,
				checkoutCity: data.user.city,
				checkoutZip: data.user.zip,
				checkoutCountry: data.user.country,
				checkoutphone: data.user.phone,
				paymentMethod: [],
				cc_name: '',
				cc_number: [],
				cc_expiration: [],
				cc_cvv: []
			});
		});
	}

	revisarDatosUsuario(address:string, state:string, city:string, zip:any, country:string, phone:string){
		if(address=='' || state=='' || city=='' || zip=='' || country==''|| phone == '')
			this.validDatos = true;
	}

	registerCheckout() {
		if(!this.isLogueadoUser()){
			this.registerCheckout_LOCAL(false);
		}else{
			this.registerCheckout_RED();	
		}
	}
 /**
  * 1.- Orden Procesada / Pend. Envio
  * 2.- Orden Enviada / En Camino
  * 3.- Orden en camino / Orden Entregada
  */
	registerCheckout_LOCAL(id_user:boolean){
		var pago=0;
		if(this.newPay > 0){
			pago=this.newPay;
		}else{
			pago=this.amountPay;
		}
		
		const obj={
			"id_user": null,
			"firstname": this.checkoutForm.value.checkoutName,
			"lastname": this.checkoutForm.value.checkoutApellidos,
			"email": this.checkoutForm.value.checkoutemail,
			"address": this.checkoutForm.value.checkoutaddress,
			"state": this.checkoutForm.value.checkoutState,
			"country": this.checkoutForm.value.checkoutCountry, 
			"zip": this.checkoutForm.value.checkoutZip,
			"phone": this.checkoutForm.value.checkoutphone,
			"code": this.code_acept,
			"paymentMethod": this.checkoutForm.value.paymentMethod,
			"totalItems": this.totalItems,
			"amountPayOriginal": this.amountPay,
			"amountPay": pago,
			"descount": this.descountPorcentaje,
			"status_shipment": 1,
			"guia_shipment":'',
			"service_shipment":'',
			"date_delivery":'',
			"sale_detail": this.cartList,
			"city": this.checkoutForm.value.checkoutCity,
		}

		console.log(JSON.stringify(obj));
		if(id_user){
			obj.id_user = parseInt(sessionStorage.getItem("Id_User"));
		}

		this.checkoutSvc.insertCheckout_invitado(obj).subscribe((response:any)=>{
			if(response.rowsAffected >0){
				Swal.fire(
					'Bien hecho!',
					'Tu Proceso de pago fue aceptado correctamente!',
					'success'
				);
				localStorage.removeItem("carrito");
				this.svcPay.sendCriterio(true);
				this.confirmarOrden(response.uid);
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Oopss...',
					text: `Error al procesar pago`
				});
			}
			
		},(err:any)=>{
			Swal.fire({
				icon: 'error',
				title: 'Oopss...',
				text: `${JSON.stringify(err)}`
			});
		});
	}
	
	registerCheckout_RED(){
		this.registerCheckout_LOCAL(true);
		const obj ={
			"idUser": parseInt(sessionStorage.getItem("Id_User")),
			"code": this.code_acept,
			"paymentMethod": this.checkoutForm.value.paymentMethod
		}
		this.checkoutSvc.insertCheckout(obj).subscribe( (response:any)=>{
			if(response > 0){
				this.svcPay.sendCriterio(true);
				/*
				Swal.fire(
					'Bien hecho!',
					'Tu Proceso de pago fue aceptado correctamente!',
					'success'
				)
				this.svcPay.sendCriterio(true);*/
				//this.confirmarOrden();
			}
		}, (err:any)=>{
			/*
			Swal.fire({
				icon: 'error',
				title: 'Oopss...',
				text: `${JSON.stringify(err)}`
			});
			*/
		});
	}

	updateDatosEnvio(){
		const obj = {
			"id": parseInt(sessionStorage.getItem("Id_User")),
			"address": this.checkoutForm.value.checkoutaddress,
			"city": this.checkoutForm.value.checkoutCity,
			"state": this.checkoutForm.value.checkoutState,
			"country": this.checkoutForm.value.checkoutCountry,
			"zip": this.checkoutForm.value.checkoutZip,
			"phone": this.checkoutForm.value.checkoutphone
		};

		
		this.svcUser.updateUserDomicilio(obj).subscribe(response => {
			if(response){
				Swal.fire(
					'Bien hecho!',
					`Tu domicilio fue actualizado correctamente!`,
					'success'
				)
				this.getCheckout();
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
		if(cartItems.length > 0){
			for (let i in cartItems) {
				this.productsSvc.getProduct(cartItems[i].Id_Product).subscribe((data: any) => {
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
		}else{
			this.routerLink.navigateByUrl('/home');
		}


	}

	getList_RED(){
		let cartItems = [];

		cartItems = JSON.parse(localStorage.getItem("carrito"));
		this.amountPay= 0;
		this.cartList = [];
		
		this.svcCarritoRed.getAllItemsShopping(parseInt(sessionStorage.getItem("Id_User"))).subscribe((data:any)=>{
			cartItems = data;

			if(cartItems.length > 0){
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
			}else{
				this.routerLink.navigateByUrl('/home');
			}
		});

	}


	applyCode() {

		this.checkoutSvc.validCodePromo(this.CodePromoForm.value.code_promotion).subscribe((descount: number) => {

			if (descount > 0) {
				this.descountPorcentaje = descount;
				this.code_acept = this.CodePromoForm.value.code_promotion;
				this.newPay = this.amountPay - (this.amountPay * descount) / 100;
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: `El codigo tiene ${descount}% descuento`,
					showConfirmButton: false,
					timer: 1500
				});
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

	confirmarOrden(id:any){
		this.routerLink.navigateByUrl(`/shipment-order/${id}`);
	}

}
