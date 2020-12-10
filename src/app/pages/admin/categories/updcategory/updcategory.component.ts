import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/core/categories.service';
import Swal from 'sweetalert2'
@Component({
	selector: 'app-updcategory',
	templateUrl: './updcategory.component.html',
	styleUrls: ['./updcategory.component.scss']
})
export class UpdcategoryComponent implements OnInit {

	_name:string ="";
	_id:any;

	public categoryForm: FormGroup = this.fb.group({
		name: [this._name],
	});


	constructor(private fb: FormBuilder, private router: ActivatedRoute, private categorySvc:CategoriesService,private routerLink: Router ) {
		this.router.params.subscribe(params => {
			this._id = params['id'];
			this.getCategory(parseInt(params['id']));
		});
	}

	ngOnInit(): void {
	}

	getCategory(id:number) {
		this.categorySvc.getCategory(id).subscribe((data: any) => {
			this._name  = data.category.name;
			this.categoryForm.setValue({
				name: this._name
			});
		});	
	}

	updateCategory(){

		const obj = {
			"id": parseInt(this._id),
			"name": this.categoryForm.get('name').value
		};
		this.categorySvc.updateCategory(obj).subscribe(response => {
			if(response){
				Swal.fire(
					'Bien hecho!',
					`Tu categoria con ID ${this._id} fue actualizada correctamente!`,
					'success'
				)
				this.routerLink.navigateByUrl(`/admin/categories`);
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
}
