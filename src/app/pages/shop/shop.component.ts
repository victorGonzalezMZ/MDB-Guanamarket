import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/core/brands.service';
import { MenuNavbarCategoriesService } from 'src/app/services/core/menu-navbar-categories.service';
import { ProductsService } from 'src/app/services/core/products.service';
import settings from '../../settings';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';
import { WishlistmessengerService } from 'src/app/services/observables/wishlistmessenger.service';
import Swal from 'sweetalert2'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Lightbox } from 'ngx-lightbox';
@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

	menuCategories: any[] = [];
	menuBrands: any[] = [];

	Category: string;
	shortBy: string;
	Brand: string;
	ShortByDirection: string;

	listProducts: any[] = [];
	imagesUrl = settings.apinode.urlPhotoServer;

	minValue: number = 0;
	maxValue: number = 2599;
	options: Options = {
		floor: 0,
		ceil: 2599,
		translate: (value: number, label: LabelType): string => {
			switch (label) {
				case LabelType.Low:
					return "<b>Min:</b> $" + value;
				case LabelType.High:
					return "<b>Max:</b> $" + value;
				default:
					return "$" + value;
			}
		}
	};

	constructor(
		private navCategorySvc: MenuNavbarCategoriesService,
		private produtsSvc: ProductsService,
		private brandSvc: BrandsService,
		private router: Router,
		private svcCarrito: CarritomessengerService,
		private svcWishList: WishlistmessengerService,
		private jwtHelper: JwtHelperService,
		private _lightbox: Lightbox) {

			this.shortBy = "title";
			this.ShortByDirection="ASC";
			this.Category = null;
			this.Brand = null;
	}

	ngOnInit(): void {
		this.navCategorySvc.getCategoryMenus().subscribe((data: any) => {
			this.menuCategories = data.listCategories;
		});
		this.brandSvc.getAllBrands().subscribe((data: any) => {
			this.menuBrands = data.list;
		});
		this.getAllProducts();
		this.Brand = 'Todos';
	}


	open(src:string,caption:string,thumb:string): void {
		var _albums = [];
		const album = {
			src: src,
			caption: caption,
			thumb: thumb
		 };
		_albums.push(album);
		this._lightbox.open(_albums,0);
		console.log(_albums[0]);
	  }
	
	  close(): void {
		// close lightbox programmatically
		this._lightbox.close();
	  }


	click_viewProduct(item: any) {
		this.router.navigate(['/product-detail', item.id]);
	}

	click_addCart(item:any){
		item.Quantity = 1;
		this.svcCarrito.sendProdutAlCarrito(item);
	}

	click_addWishList(item:any){
		if(this.isUserAuthenticated()){
			this.svcWishList.sendProductAlWishList(item);
			Swal.fire(
				'Excelente !',
				`${item.title} fue agregado a lista de deseos!!!`,
				'success'
			  );
		}else{
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No tienes una sesión iniciada !',
				footer: '<a [routerLink]="/login" routerLinkActive="active">Logueate para agregar</a>'
			})
		}
	}

	/**
	 * SECCION PARA GET
	 */
	getAllProducts() {
		this.produtsSvc.getAllProducts().subscribe((data: any) => {
			this.listProducts = data.listProducts;
		});
	}

	/**
	 * SECCION DE FILTRO
	 */
	filtrarByCategory(category: string) {
		if(category=='')
			this.Category = null;
		else
			this.Category = category;
		this.allFilters();
	}

	filtrarByOrderBy(columna: string) {
		this.shortBy = columna;
		this.allFilters();
	}

	filtrarByShortByDirection(columna: string){
		this.ShortByDirection = columna;
		this.allFilters();
	}

	filtrarByBrand(brand: string) {
		this.Brand = brand;
		this.allFilters();
	}

	filtrarRango(){
		this.allFilters();
	}

	allFilters(){

		var _Brand = null
		if(this.Brand != "Todos")
			_Brand = this.Brand;

		const obj = {
			"Category":this.Category,
			"Brand": _Brand,
			"ShortBy": this.shortBy,
			"ShortByDirection": this.ShortByDirection,
			"MinValor": this.minValue,
			"MaxValor": this.maxValue,
		};
		this.produtsSvc.getAllProductsByParams(obj).subscribe((data: any) => {
			console.log( data.listProducts);
			this.listProducts = data.listProducts;
		});
	}

	isUserAuthenticated() {
		const token: string = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token))
			return true;
		else 
			return false;
	}

}
