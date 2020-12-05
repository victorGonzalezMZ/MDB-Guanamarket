import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/core/carousel.service';
import { MenuNavbarCategoriesService } from 'src/app/services/core/menu-navbar-categories.service';
import { ProductsService } from 'src/app/services/core/products.service';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { CarritomessengerService } from 'src/app/services/observables/carritomessenger.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	menuCategories: any[] = [];
	listProducts: any[] = [];
	listProductsNew: any[] = [];
	listProductsRandom: any[] = [];
	category: string;
	carouselItems: any[] = [];
	
	constructor(
			private navCategorySvc: MenuNavbarCategoriesService, 
			private produtsSvc: ProductsService, 
			private carouselSvc: CarouselService,
			private router: Router) { 
		
		this.produtsSvc.GetTop3NewProducts().subscribe((data:any)=>{
			this.listProductsNew = data.listProducts
		});

		this.produtsSvc.GetTop3Random().subscribe((data:any)=>{
			this.listProductsRandom = data.listProducts;
		});
		
		this.router.events
           .filter(e => e instanceof NavigationEnd)
           .pairwise().subscribe((e) => {
			   if( e[0]['url']==='/login' && e[1]['url'] ==='/home'){
					window.location.reload();
			   }
           });
	}

	ngOnInit(): void {
		this.getData();
		this.category="All";
	}

	getData() {
		//Cargar menus
		this.getCategories();

		//Cargar products
		this.getAllProducts();
		
	
		//Cargar Carousel
		this.getCarousel();
	}

	
	filtrarByCategory(category: string) {
		//Asignamos valor a la bandera para cambiar menus
		this.category = category;

		if (category == 'All')
			this.getAllProducts();
		else
			this.getAllProductsByCategory(category);
	}

	filtrarBySearch(title: string) {
		if (title != "")
			this.getAllProductBySearch(title);
		else
			this.getAllProducts();
	}

	getAllProducts() {
		this.produtsSvc.getAllProducts().subscribe((data: any) => {
			this.listProducts = data.listProducts;
		});
	}

	getAllProductsByCategory(category: string) {
		this.produtsSvc.getAllProductsByCategory(category).subscribe((data: any) => {
			this.listProducts = data.listProducts;
		});
	}

	getAllProductBySearch(search: string) {
		this.produtsSvc.getAllProductsBySearch(search).subscribe((data: any) => {
			this.listProducts = data.listProducts;
		});
	}

	getCategories() {
		this.navCategorySvc.getCategoryMenus().subscribe((data: any) => {
			this.menuCategories = data.listCategories;
		});
	}

	getCarousel() {
		this.carouselSvc.getItemsCarousel().subscribe((data: any) => {
			console.log(data);
			this.carouselItems = data.carousel;
		});

	}


}
