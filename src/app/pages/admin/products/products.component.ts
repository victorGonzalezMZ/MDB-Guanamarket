import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/core/categories.service';
import { ProductsService } from 'src/app/services/core/products.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import settings from '../../../settings';
@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


	elements: any = [];
	headElements = ['IMAGEN', 'ID', 'SKU', 'TITULO', 'MARCA', 'CATEGORIA', 'PRECIO', 'PRECIO VENTA', 'ACCIONES'];
	defaultBindingsList = [];
	selectedBrand = null;
	imagesUrl = settings.apinode.urlServer + 'get-image-product/';

	
	constructor(private productsSvc: ProductsService, 
				private categoriesSvc: CategoriesService,
				private router: Router) {

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

	click_addProduct(){
		this.router.navigateByUrl('/admin/products/new');
	}

	click_deleteProduct(id:number){
		Swal.fire({
			title: 'Estas seguro?',
			text: "Ya no podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'No, cancelar!',
			confirmButtonColor: '#6a1b9a',
			cancelButtonColor:'#CC0000',
			reverseButtons: true
		}).then((result) => {	
			if(result.value){
				this.productsSvc.deleteProduct(id).subscribe((data:any)=>{
					this.getAllProducts();
				});
			}else{
				Swal.fire(
					'Cancelado',
					'El Item se encuentra seguro =)',
					'error'
				);
			}
		});
			
		
	}

	click_updateProduct(id:number){
		this.router.navigateByUrl(`/admin/products/update/${id}`);
	}

}
