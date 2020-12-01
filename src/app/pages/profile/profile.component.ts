import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UploadService } from 'src/app/services/core/upload.service';
import { UsersService } from 'src/app/services/core/users.service';
import settings from '../../settings';
import { sha256 } from 'js-sha256';
import Swal from 'sweetalert2'
import { ViewChild } from '@angular/core';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	@ViewChild('inputImage')
	inputImage: ElementRef;

	imagenLast: string;
	_nick:string;
	_id:number;
	image: any = null;
	newImage:boolean = false;
	imagesUrl = settings.apinode.urlServer + 'get-image-user/';
	invalidPassword: boolean=false;
	
	public userForm: FormGroup = this.fb.group({
		Password: [],
		PasswordVerify: [],
		Firstname: [],
		Lastname: [],
		Email:[],
		Address:[],
		City: [],
		State: [],
		Country: [],
		Zip:[],
		Phone:[]
	});

	constructor(private fb: FormBuilder, 
		private uploadSvc: UploadService,
		private userSvc: UsersService,
		private jwtHelper: JwtHelperService) { 

			const token = localStorage.getItem("jwt");
			const token_decode = this.jwtHelper.decodeToken(token);
			this._nick = token_decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
			this.getData(this._nick);
	
		}

	ngOnInit(): void {
		
	}

	getData(nick:string){
		this.userSvc.getUserByNick(nick).subscribe((data:any)=>{
			
			this._id = data.user.id;
			this.imagenLast = data.user.imagen;
			this.userForm.setValue({
				Firstname: data.user.firstName,
				Lastname: data.user.lastname,
				Email: data.user.email,
				Address: data.user.address,
				City: data.user.city,
				State: data.user.state,
				Country: data.user.country,
				Zip:data.user.zip,
				Phone: data.user.phone,
				Password:"",
				PasswordVerify:""
			});
		});
	}

	public updateProfile(){
		console.log("Hola mundo");
		const obj = {
			"id": this._id,
			"nick": this._nick,
			"password": "",
			"firstName": this.userForm.get('Firstname').value,
			"lastname": this.userForm.get('Lastname').value,
			"email": this.userForm.get('Email').value,
			"address": this.userForm.get('Address').value,
			"city": this.userForm.get('City').value,
			"state": this.userForm.get('State').value,
			"country": this.userForm.get('Country').value,
			"zip": this.userForm.get('Zip').value,
			"imagen": this.imagenLast,
			"phone": this.userForm.get('Phone').value,
		};

		console.log("Hola mundo2");
		if(this.userForm.get('Password').value != ""){
			if(this.userForm.get('Password').value == this.userForm.get('PasswordVerify').value){
				obj.password = sha256(this.userForm.get('Password').value);
			}else{
				this.invalidPassword=true
			}
		}


		if(this.image){
			let formData = new FormData();
			formData.append("uploads[]", this.image, this.image.name);
			this.uploadSvc.deleteImageUser(obj.imagen,this._nick).subscribe((res:any) =>{
				this.uploadSvc.uploadImageUser(formData,this._nick).subscribe((res:any) => {
					this.inputImage.nativeElement.value="";
					obj.imagen = res.imagen;		
					this.updateProfileSend(obj);
				});
			});
		}else{
			this.updateProfileSend(obj);
		}

	}

	public updateProfileSend(obj:any){
		this.userSvc.updateUser(obj).subscribe(response => {
			if(response){
				Swal.fire(
					'Bien hecho!',
					`Tu usuario fue actualizado correctamente!`,
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
		this.getData(this._nick);
		
	}


	handleImage(event: any): void {
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
