import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/core/brands.service';
import { MenuNavbarCategoriesService } from 'src/app/services/core/menu-navbar-categories.service';
import { ProductsService } from 'src/app/services/core/products.service';
import settings from '../../settings';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

	menuCategories: any[] = [];
	menuBrands: any[] = [];

	category: string;
	shortBy: string;
	brand: string;

	listProducts: any[] = [];
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	minValue: number = 0;
	maxValue: number = 2000;
	options: Options = {
		floor: 0,
		ceil: 2000,
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
		private brandSvc: BrandsService) {
		this.shortBy = "title";
		this.category = "";
		this.brand = "Todos";


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
		this.category = category;
	}

	filtrarByOrderBy(columna: string) {
		this.shortBy = columna;
	}

	filtrarByBrand(brand: string) {
		this.brand = brand;
	}

	filtrarRango(){
		console.log(`El valor minimo es: ${this.minValue}`);
		console.log(`El valor máximo es: ${this.maxValue}`);
		
	}



}
