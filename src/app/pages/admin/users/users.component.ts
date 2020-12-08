import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/core/users.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import settings from '../../../settings';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	listUsers: any[] = [];
	headElements = ['Imagen','Id','Nombre', 'Apellidos', 'Email', 'Role', 'Acciones'];
	imagesUrl= settings.apinode.urlPhotoUserServer;
	defaultBindingsList = [];
	selectedType = null;

	constructor(private userSvc: UsersService,
		private router: Router) { }

	ngOnInit(): void {
		this.getAllUsers();
	}

	getAllUsers() {
		this.userSvc.getAllUsers().subscribe((data: any) => {
			this.listUsers = data;
		});
	}

	deleteUser(item:any){
		this.userSvc.deleteUser(item.id).subscribe((data:any)=>{
			this.getAllUsers();
		})
	}

	filtrarBySearch(title: string) {
		
	}

	onChangeType(){

	}

	click_addUser(){
		this.router.navigateByUrl('/admin/users/new');
	}
}
