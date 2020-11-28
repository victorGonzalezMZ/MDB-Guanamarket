import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from 'src/app/services/core/categories.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-newcategory',
	templateUrl: './newcategory.component.html',
	styleUrls: ['./newcategory.component.scss']
})
export class NewcategoryComponent implements OnInit {

	constructor(private categorySvc: CategoriesService) { }

	ngOnInit(): void {
	}

	registerNewCategory(form: NgForm) {
		const obj = {
			"name": form.value.name
		};

		this.categorySvc.insertCategory(obj).subscribe(response => {
			if(response>0){
				Swal.fire(
					'Bien hecho!',
					`Tu categori con ID ${response} fue registrado correctamente!`,
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


}
