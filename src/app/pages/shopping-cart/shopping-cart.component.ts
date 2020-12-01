import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';
import { ItemCarritomessengerService } from 'src/app/services/observables/item-carritomessenger.service';

@Component({
	selector: 'orquestador-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


	constructor(private svcCarrito: CarritomessengerService,
				private svcItemCarrito: ItemCarritomessengerService) {
		this.svcCarrito.onListenProductInCarrito().subscribe( (item:any)=>{
			this.addProductToCart_Local(item);
		});	
	 }

	ngOnInit(): void {
		this.countItemsToCart_Local();
	}

	ngOnDestroy(): void {
		
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

			localStorage.removeItem("carrito");
			await localStorage.setItem("carrito",JSON.stringify(
				cartItems
			));
			this.countItemsToCart_Local();
		}

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
	


}
