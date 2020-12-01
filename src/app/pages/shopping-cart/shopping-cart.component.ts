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
		this.svcCarrito.onListenDeleteProductInCarrito().subscribe((item:any) =>{
			this.deleteProductToCart_Local(item);
		});
		this.svcCarrito.onListenUpdateProductInCarrito().subscribe((item:any)=>{
			this.updateProductToCart_Loca(item);
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
	addProductToCart_Local(item:any){
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

			this.orchestrationTokenCarrito(cartItems);
		}

	}
	
	deleteProductToCart_Local(item:any){
		let cartItems = [];
		cartItems = JSON.parse(localStorage.getItem("carrito"));
		cartItems = cartItems.filter(({ Id_Product }) => Id_Product !== item.id); 
		this.orchestrationTokenCarrito(cartItems);
	}

	updateProductToCart_Loca(item:any){
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

	async orchestrationTokenCarrito(cartItems:any){
		localStorage.removeItem("carrito");
		await localStorage.setItem("carrito",JSON.stringify(
			cartItems
		));
		this.countItemsToCart_Local();
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
