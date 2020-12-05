import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishListService } from 'src/app/services/core/wish-list.service';
import settings from 'src/app/settings';
import { WishList} from 'src/app/models/wishlist';
import { ProductsService } from 'src/app/services/core/products.service';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';
import Swal from 'sweetalert2'
@Component({
	selector: 'app-wish-list-detail',
	templateUrl: './wish-list-detail.component.html',
	styleUrls: ['./wish-list-detail.component.scss']
})
export class WishListDetailComponent implements OnInit {

	wishlist_Items: any[] = [];
	selectedOrder = null;
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	orders = [
		{ label: 'Orden alfabético', order: 'alfabetico' },
		{ label: 'Precio mas bajo a alto', order: 'precio_bajo' },
		{ label: 'Precio mas alto a bajo', order: 'precio_alto' },
		{ label: 'Recietes a Antiguos', order: 'recientes' },
		{ label: 'Antiguos a Recientes', order: 'antiguos' }
	];


	constructor(private svcWishList: WishListService,
		private produtsSvc: ProductsService,
		private router: Router,
		private svcCarrito: CarritomessengerService,) { }

	ngOnInit(): void {
		this.loadWishlist();
	}

	loadWishlist() {
		this.svcWishList.getAllItemsWishList(parseInt(sessionStorage.getItem("Id_User"))).subscribe((data: any[]) => {
			this.wishlist_Items = data;
		});
	}

	searchWishList(search: string) {
		if(search){
			this.svcWishList.SearchWishList_Products(parseInt(sessionStorage.getItem("Id_User")),search).subscribe((data:any) => {
				this.wishlist_Items = data.listProducts;
			});
		}else{
			this.loadWishlist();
		}
	
	};

	changeOrder() {
		this.svcWishList.getItemsbyOrder(this.selectedOrder.order,parseInt(sessionStorage.getItem("Id_User"))).subscribe((data:any[]) => {
			this.wishlist_Items = data;
		  });
	};


	public goProductPage(item: any) {
		this.router.navigate(['/product-detail', item.id]);
	};

	addShoppinCart(item: any) {
		this.svcCarrito.sendProdutAlCarrito(item);
		Swal.fire(
			'Excelente !',
			`${item.title} fue agregado a lista de deseos!!!`,
			'success'
		);
	}

	removeWishList(item: any) {
		const obj:WishList = new WishList(0,parseInt(sessionStorage.getItem("Id_User")),item.id);
		this.svcWishList.removeItemWishList(obj).subscribe((data:any[]) => {
			this.loadWishlist();
		});
	}

}
