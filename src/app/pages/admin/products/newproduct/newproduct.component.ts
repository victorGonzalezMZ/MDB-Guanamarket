import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  listCategories:any;

  constructor(
	  private categoriesSvc: CategoriesService, 
	  private uploadSvc: UploadService, 
	  private productsSvc: ProductsService,) { }

  ngOnInit(): void {
    this.categoriesSvc.getCategories().subscribe((data: any) => {
	  	this.listCategories= data.listCategories; 
    });
  }

  registerNewProduct(form: NgForm) {
	let formData = new FormData();
	let imagen:string;
	formData.append("uploads[]", this.image, this.image.name);

	this.uploadSvc.uploadImageProduct(formData).subscribe((res:any) => {
		const obj = {
			"title": form.value.title,
			"sku": form.value.sku,
			"description": form.value.description,
			"brand": form.value.brand,
			"idCategory": parseInt(form.value.idCategory),
			"ranking": form.value.ranking,
			"price":form.value.price,
			"seelingPrice": form.value.seelingPrice,
			"status": form.value.status,
			"imagen": res.imagen,
			"updateDate": "2020-11-16T00:00:00"
		};

		

		this.productsSvc.insertProduct(obj).subscribe(response => {
			if(response>0){
				Swal.fire(
					'Bien hecho!',
					`Tu producto con ID ${response} fue registrado correctamente!`,
					'success'
				)
			}
		}, err => {
			console.log(err);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${err}`,
			});
		});
		
	});

  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

}
