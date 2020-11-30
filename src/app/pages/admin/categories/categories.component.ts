import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/core/categories.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	elements: any = [];
	headElements = ['ACCIONES','IMAGEN', 'ID', 'NOMBRE', 'CREACIÓN', 'ACTUALIZACIÓN'];
	defaultBindingsList = [];

	constructor(
		private categoriesSvc: CategoriesService,
		private router: Router) { }

	ngOnInit(): void {
		this.getAllCategories();
	}

	getAllCategories() {
		this.categoriesSvc.getCategories().subscribe((data: any) => {
			this.elements = data.listCategories;
		});
	}

	filtrarBySearch(title: string) {
		if (title != "") {
			this.categoriesSvc.getCategoriesBySearch(title).subscribe((data: any) => {
				this.elements = data.list;
			});
		} else
			this.getAllCategories();
	}


	click_addCategory() {
		this.router.navigateByUrl(`/admin/categories/new`);
	}

	click_updateCategory(id:number){
		this.router.navigateByUrl(`/admin/categories/update/${id}`);
	}

	click_deleteCategory(id:number) {

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
				this.categoriesSvc.deleteCategory(id).subscribe((data:any)=>{
					this.getAllCategories();
				});
			}else{
				Swal.fire(
					'Cancelado',
					'La categoría se encuentra a salvo =)',
					'error'
				);
			}
		});
			
	}

}
