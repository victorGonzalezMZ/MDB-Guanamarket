import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/core/categories.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { UploadService } from 'src/app/services/core/upload.service';
import Swal from 'sweetalert2'


@Component({
	selector: 'app-newproduct',
	templateUrl: './newproduct.component.html',
	styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {

	private image: any;
	listCategories: any;
	files: File[] = [];
	loadImagen:boolean;

	constructor(
		private categoriesSvc: CategoriesService,
		private uploadSvc: UploadService,
		private productsSvc: ProductsService,
		private router: Router) { }

	ngOnInit(): void {
		this.loadImagen = false;
		this.categoriesSvc.getCategories().subscribe((data: any) => {
			this.listCategories = data.listCategories;
		});
	}

	registerNewProduct(form: NgForm) {

		const obj = {
			"title": form.value.title,
			"sku": form.value.sku,
			"description": form.value.description,
			"brand": form.value.brand,
			"idCategory": parseInt(form.value.idCategory),
			"ranking": form.value.ranking,
			"price": form.value.price,
			"seelingPrice": form.value.seelingPrice,
			"status": form.value.status,
			"imagen": "no-imagen.png",
			"updateDate": "2020-11-16T00:00:00"
		};
		if(!form.value.ranking)
			obj.ranking = 3;

		if(this.loadImagen){
			let formData = new FormData();
			formData.append("uploads", this.image, this.image.name);
			this.uploadSvc.uploadImageProduct(formData).subscribe((res: any) => {
				obj.imagen = res.imagen
				this.registerNewProductFinal(obj);
			});
		}else{
			this.registerNewProductFinal(obj);
		}

	}

	registerNewProductFinal(obj:any){
		this.productsSvc.insertProduct(obj).subscribe(response => {
			if (response > 0) {
				Swal.fire(
					'Bien hecho!',
					`Tu producto con ID ${response} fue registrado correctamente!`,
					'success'
				)
				this.router.navigateByUrl(`/admin/products`);
			}

		}, err => {
			console.log(err);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${JSON.stringify(err)}`,
			});
		});
	}


	onSelect(event) {
		this.image = event.addedFiles[0];
		this.loadImagen = true;
		this.files.push(...event.addedFiles);
	}
	
	onRemove(event) {
		this.image = null;
		this.loadImagen = false;
		this.files.splice(this.files.indexOf(event), 1);
	}

}
