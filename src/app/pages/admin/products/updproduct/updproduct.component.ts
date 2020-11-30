import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/core/categories.service';
import { ProductsService } from 'src/app/services/core/products.service';
import { UploadService } from 'src/app/services/core/upload.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-updproduct',
	templateUrl: './updproduct.component.html',
	styleUrls: ['./updproduct.component.scss']
})
export class UpdproductComponent implements OnInit {

	listCategories:any;

	image: any = null;
	imagenLast: string;
	newImage:boolean = false;
	_id:number;
	
	files: File[] = [];

	public productForm: FormGroup = this.fb.group({
		title: [],
		sku: [],
		description: [],
		brand: [],
		idCategory: [],
		ranking:[],
		price:[],
		seelingPrice: [],
		status: []
	});

	constructor(private fb: FormBuilder, 
		private router: ActivatedRoute, 
		private productSvc:ProductsService,
		private categoriesSvc: CategoriesService, 
		private uploadSvc: UploadService) { 
			this.router.params.subscribe(params => {
				this._id = parseInt(params['id']);
				this.getProduct(parseInt(params['id']));
			});
		}

  	ngOnInit(): void {
		this.categoriesSvc.getCategories().subscribe((data: any) => {
			this.listCategories= data.listCategories; 
	  });

	}

	
 
	onSelect(event) {
		this.image = event.addedFiles[0];
		if(event.addedFiles[0]){
		
			this.image = event.addedFiles[0];
			this.newImage = true;
		}else{
			this.image = null;
			this.newImage = false;
		}
		this.files.push(...event.addedFiles);
	}
	
	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}

	getProduct(id:number){
		this.productSvc.getProduct(id).subscribe((data:any)=>{
			this.imagenLast = data.product.imagen;
			this.productForm.setValue({
				title: data.product.title,
				sku: data.product.sku,
				description: data.product.description,
				brand: data.product.brand,
				idCategory: data.product.idCategory,
				ranking: data.product.ranking,
				price: data.product.price,
				seelingPrice: data.product.seelingPrice,
				status: data.product.status
			});
		});
	}


	public updateProduct(){

		const obj = {
			"title": this.productForm.get('title').value,
			"sku": this.productForm.get('sku').value,
			"description": this.productForm.get('description').value,
			"brand": this.productForm.get('brand').value,
			"idCategory": parseInt( this.productForm.get('idCategory').value),
			"ranking": this.productForm.get('ranking').value,
			"price": this.productForm.get('price').value,
			"seelingPrice": this.productForm.get('seelingPrice').value,
			"status":this.productForm.get('status').value,
			"imagen": this.imagenLast,
			"id": this._id
		};


		if(this.image){
			let formData = new FormData();
			formData.append("uploads[]", this.image, this.image.name);
			console.log(formData);
			this.uploadSvc.deleteImageProduct(obj.imagen).subscribe((res:any) =>{
				console.log('Delete imagen: '+JSON.stringify(res));
				this.uploadSvc.uploadImageProduct(formData).subscribe((res:any) => {
					obj.imagen = res.imagen;		
					console.log('Upload Imagen: '+JSON.stringify(res));
					this.updateProductSend(obj);
				});
			});
		}else{
			this.updateProductSend(obj);
		}

	}

	updateProductSend(obj:any){
		this.productSvc.updateProduct(obj).subscribe(response => {
			if(response){
				Swal.fire(
					'Bien hecho!',
					`Tu producto con ID ${response} fue actualizado correctamente!`,
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
		

	}

	handleImage(event: any): void {
		console.log(event.target.files[0]);
		this.image = event.target.files[0];
		if(event.target.files[0]){
		
			this.image = event.target.files[0];
			this.newImage = true;
		}else{
			this.image = null;
			this.newImage = false;
		}

	}


}
