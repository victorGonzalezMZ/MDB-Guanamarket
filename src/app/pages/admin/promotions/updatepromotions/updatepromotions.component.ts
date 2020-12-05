import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PromotionsService } from 'src/app/services/core/promotions.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-updatepromotions',
	templateUrl: './updatepromotions.component.html',
	styleUrls: ['./updatepromotions.component.scss']
})
export class UpdatepromotionsComponent implements OnInit {
	_id: number;

	public updatePromotionForm: FormGroup = this.fb.group({
		codigo: [],
		title: [],
		discount: [],
		description: [],
		expires_date: [],
		theme: []
	});
	constructor(private fb: FormBuilder, private router: ActivatedRoute,
		private promoctionSvc: PromotionsService) {

		this.router.params.subscribe(params => {
			this._id = parseInt(params['id']);
			this.getPromotion(parseInt(params['id']));
		});

	}

	ngOnInit(): void {
	}
	getPromotion(id: number) {
	

		const obj = { "id": id };
		this.promoctionSvc.getPromotion(obj).subscribe((data: any) => {

			this.updatePromotionForm.setValue({
				codigo: data[0].code.toString(),
				title: data[0].title,
				description: data[0].description,
				discount: data[0].discount,
				expires_date: new Date(data[0].expires_date).toISOString().slice(0, 10),
				theme: data[0].theme
			});			
		});
	}


	public updatePromotion() {
		
		const obj = {
			"title": this.updatePromotionForm.value.title,
			"code": this.updatePromotionForm.value.codigo,
			"description": this.updatePromotionForm.value.description,
			"discount": parseInt(this.updatePromotionForm.value.discount),
			"expires_date": this.updatePromotionForm.value.expires_date,
			"ranking": this.updatePromotionForm.value.ranking,
			"theme": this.updatePromotionForm.value.theme,
			"id": this._id
		};

		this.promoctionSvc.updatePromotion(obj).subscribe(response => {
			if (response) {
				Swal.fire(
					'Bien hecho!',
					`Tu Promoció con ID ${response} fue actualizado correctamente!`,
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
