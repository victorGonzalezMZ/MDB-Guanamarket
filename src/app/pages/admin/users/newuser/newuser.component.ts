import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from 'src/app/services/core/upload.service';
import Swal from 'sweetalert2'
import { sha256 } from 'js-sha256';
import { UsersService } from 'src/app/services/core/users.service';

@Component({
	selector: 'app-newuser',
	templateUrl: './newuser.component.html',
	styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

	image: any ;
	loadImagen:boolean;

	listCategories: any;
	files: File[] = [];

	constructor(
		private uploadSvc: UploadService,
		private userSvc: UsersService) { }

	ngOnInit(): void {
		this.loadImagen = false;
	}

	registerNewUser(form: NgForm) {
		

		
		const obj = {
			"nick": form.value.nick,
			"email": form.value.email,
			"firstName": form.value.firstName,
			"lastname": form.value.lastname,
			"password": sha256('123456789'),
			"role": 'ADMIN',
			"address": form.value.address,
			"city": form.value.city,
			"state": form.value.state,
			"country": form.value.country,
			"zip": ""+form.value.zip,
			"imagen": "imagen.png",
			"phone": ""+form.value.phone
		};
		
	
		if(this.loadImagen){
			let formData = new FormData();
			formData.append("uploads[]", this.image, this.image.name);
			this.uploadSvc.uploadImageUser(formData,sessionStorage.getItem("nick")).subscribe((res: any) => {
				obj.imagen = res.imagen;
				this.insertNewUser(obj);				
			});
		}else{
			this.insertNewUser(obj);		
		}

	}

	insertNewUser(obj:any){
		this.userSvc.registerNewUser(obj).subscribe(response => {
			if (response > 0) {
				Swal.fire(
					'Bien hecho!',
					`Se registro un nuevo usuario con el ID ${response}`,
					'success'
				)
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
