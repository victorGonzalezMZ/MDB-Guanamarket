import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/core/brands.service';
import { MenuNavbarCategoriesService } from 'src/app/services/core/menu-navbar-categories.service';
import { ProductsService } from 'src/app/services/core/products.service';
import settings from '../../settings';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';

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
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

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
		private svcCarrito: CarritomessengerService) {
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
	}

	click_viewProduct(item: any) {
		this.router.navigate(['/product-detail', item.id]);
	}

	click_addCart(item:any){
		item.Quantity = 1;
		this.svcCarrito.sendProdutAlCarrito(item);
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

		console.log(obj);
		this.produtsSvc.getAllProductsByParams(obj).subscribe((data: any) => {
			console.log( data.listProducts);
			this.listProducts = data.listProducts;
		});
	}

	

}
