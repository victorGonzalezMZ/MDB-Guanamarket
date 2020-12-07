import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingcartService } from 'src/app/services/core/shoppingcart.service';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';
import { ItemCarritomessengerService } from 'src/app/services/observables/item-carritomessenger.service';
import { ShoppingCart } from 'src/app/models/shoppingcart'
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'orquestador-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

	subscriptionLogin$: Subscription;

	constructor(private svcCarrito: CarritomessengerService,
				private svcItemCarrito: ItemCarritomessengerService,
				private svcCarritoRed : ShoppingcartService,
				private jwtHelper: JwtHelperService,
				private svcLogin: LoginmessengerService) {
		
		this.subscriptionLogin$ = this.svcLogin.onListenCriterio().subscribe( (criterio:boolean)=>{
			this.cargarItemsToCart();
		});	
										
		this.svcCarrito.onListenProductInCarrito().subscribe( (item:any)=>{
			if(!this.isLogueadoUser()){
				this.addProductToCart_Local(item);
			}else{
				this.addProductToCart_Red(item);
			}
			
		});	
		this.svcCarrito.onListenDeleteProductInCarrito().subscribe((item:any) =>{
			if(!this.isLogueadoUser()){
				this.deleteProductToCart_Local(item);
			}else{
				this.deleteProductToCart_Red(item);
			}
		});
		this.svcCarrito.onListenUpdateProductInCarrito().subscribe((item:any)=>{
			if(!this.isLogueadoUser()){
				this.updateProductToCart_Local(item);
			}else{
				this.updateProductToCart_Red(item);
			}
			
		});
	 }

	ngOnInit(): void {
		this.cargarItemsToCart();
	}

	cargarItemsToCart(){
		if(!this.isLogueadoUser())
			this.countItemsToCart_Local();
		else
			this.countItemsToCart_Red();
	}

	ngOnDestroy(): void {
		this.subscriptionLogin$.unsubscribe();
	}

	isLogueadoUser(){
		const token = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			return true;
		}
		return false;
	}

	/**
	 * 
	 * @param item 
	 */
	async addProductToCart_Local(item:any){
		let productExists = false
		let cartItems = [];

		if(!localStorage.getItem("carrito")){
			localStorage.setItem("carrito",JSON.stringify([{
				Id_Product:item.id,
				SeelingPrice: item.seelingPrice,
				Quantity: item.Quantity
			}]));
		}else{
			cartItems = JSON.parse(localStorage.getItem("carrito"));

			for (let i in cartItems) {
				if (cartItems[i].Id_Product === item.id) {
				  cartItems[i].Quantity = cartItems[i].Quantity+item.Quantity
				  productExists = true
				  break;
				}
			}

			if (!productExists) {
				cartItems.push({
					Id_Product:item.id,
					SeelingPrice: item.seelingPrice,
					Quantity: item.Quantity
				})
			}
			this.sendMessageUser("Producto agregado al carrito");
			this.orchestrationTokenCarrito(cartItems);
		}

	}
	
	addProductToCart_Red(item:any){
		const obj:ShoppingCart = new ShoppingCart(
			0, parseInt(sessionStorage.getItem("Id_User")),item.id,item.Quantity
		);
		this.svcCarritoRed.addItemShoppingCart(obj).subscribe((data: any) => {
			this.svcCarrito.sendFinishedProcess(true);
			this.sendMessageUser("Producto agregado al carrito");
			this.countItemsToCart_Red();
		});

	}

	deleteProductToCart_Local(item:any){
		let cartItems = [];
		cartItems = JSON.parse(localStorage.getItem("carrito"));
		cartItems = cartItems.filter(({ Id_Product }) => Id_Product !== item.id); 
		this.orchestrationTokenCarrito(cartItems);
	}

	deleteProductToCart_Red(item:any){
		const obj:ShoppingCart = new ShoppingCart(
			0, parseInt(sessionStorage.getItem("Id_User")),item.id,0
		);
		this.svcCarritoRed.removeShoppingCart(obj).subscribe((data: any) => {
			this.svcCarrito.sendFinishedProcess(true);
			this.countItemsToCart_Red();
		});
	}

	updateProductToCart_Local(item:any){
		let cartItems = [];
		cartItems = JSON.parse(localStorage.getItem("carrito"));
		for (let i in cartItems) {
			if (cartItems[i].Id_Product === item.id) {
			  cartItems[i].Quantity = item.Quantity
			  break;
			}
		}
		this.orchestrationTokenCarrito(cartItems);
	}

	updateProductToCart_Red(item:any){
		const obj:ShoppingCart = new ShoppingCart(
			0, parseInt(sessionStorage.getItem("Id_User")),item.id,item.Quantity
		);
		this.svcCarritoRed.updateItemShoppingCart(obj).subscribe((data: any) => {
			this.svcCarrito.sendFinishedProcess(true);
			this.countItemsToCart_Red();
		});
	}

	async orchestrationTokenCarrito(cartItems:any){
		localStorage.removeItem("carrito");
		await localStorage.setItem("carrito",JSON.stringify(
			cartItems
		));
		this.svcCarrito.sendFinishedProcess(true);
		this.countItemsToCart_Local();
	}

	sendMessageUser(message:string){
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: `${message}`,
			showConfirmButton: false,
			timer: 500
		});
	}

	orchestrationCarritoLocalToRed(){

	}



	countItemsToCart_Local(){
		let cartItems = [];
		let cartTotal = 0
		if(localStorage.getItem("carrito")){
			cartItems = JSON.parse(localStorage.getItem("carrito"));
			cartItems.forEach(item => {
				cartTotal += item.Quantity
			});
		}
		this.svcItemCarrito.sendNoItems(cartTotal);
	}
	
	countItemsToCart_Red(){
		let cartItems = [];
		let cartTotal = 0
		this.svcCarritoRed.getAllItemsShopping(parseInt(sessionStorage.getItem("Id_User"))).subscribe((data: any) => {
			cartItems = data;
			cartItems.forEach(item => {
					cartTotal += item.quantity
			});
			this.svcItemCarrito.sendNoItems(cartTotal);
		});
	}



}
