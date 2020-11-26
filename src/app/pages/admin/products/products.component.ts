import { Component, OnInit } from '@angular/core';
import { FloatingActionButton } from 'ng-floating-action-menu';
import { CategoriesService } from 'src/app/services/core/categories.service';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


	elements: any = [];
	headElements = ['', 'ID', 'SKU', 'TITULO', 'MARCA', 'CATEGORIA', 'PRECIO', 'PRECIO VENTA', 'IMAGEN'];
	defaultBindingsList = [];
	selectedBrand = null;

	

	constructor(private productsSvc: ProductsService, 
				private categoriesSvc: CategoriesService) {
		this.getAllProducts();
	
		this.categoriesSvc.getCategoriesSelect().subscribe((data: any) => {
			this.defaultBindingsList = data.listCategories;
		});
	}



	ngOnInit(): void {
		this.selectedBrand = this.defaultBindingsList[0];
	}

	getAllProducts() {
		this.productsSvc.getAllProducts().subscribe((data: any) => {
			this.elements = data.listProducts;
		});
	}
	getAllProductsByCategory(category: string) {
		this.productsSvc.getAllProductsByCategory(category).subscribe((data: any) => {
			this.elements = data.listProducts;
		});
	}

	filtrarBySearch(title: string) {
		if (title != "") {
			this.productsSvc.getAllProductsBySearch(title).subscribe((data: any) => {
				this.elements = data.listProducts;
			});
		} else
			this.getAllProducts();
	}

	onChangeBrand() {
		if (this.selectedBrand.value == 0)
			this.getAllProducts();
		else {
			this.getAllProductsByCategory(this.selectedBrand.label);
		}

	}

	click_deleteProduct(id:number){
		this.productsSvc.deleteProduct(id).subscribe((data:any)=>{
			console.log(data);
			this.getAllProducts();
		});
		
	}

}
