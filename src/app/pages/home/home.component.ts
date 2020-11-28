import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/core/carousel.service';
import { MenuNavbarCategoriesService } from 'src/app/services/core/menu-navbar-categories.service';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	menuCategories: any[] = [];
	listProducts: any[] = [];
	category: string;
	carouselItems: any[] = [];
	

	constructor(private navCategorySvc: MenuNavbarCategoriesService, private produtsSvc: ProductsService, private carouselSvc: CarouselService) { }

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
