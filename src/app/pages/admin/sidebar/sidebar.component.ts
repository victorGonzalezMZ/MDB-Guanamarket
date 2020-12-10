import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuSidebarService } from 'src/app/services/core/menu-sidebar.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	headElements = ['ID', 'TITULO', 'ICONO', 'RUTA', 'USUARIO', 'SUBMENU', 'ACCIONES'];
	elements: any = [];
	menuSideBar: any[] = [];
	id_SubMenu: number;
	constructor(private svcMenuSidebar: MenuSidebarService, private jwtHelper: JwtHelperService,
		private router: Router) {
		this.id_SubMenu = 0;
		this.getAllItemSidebar();
	}

	ngOnInit(): void {
	}

	click_addItemSidebar() {
		this.router.navigateByUrl('/admin/sidebar/new');
	}
	click_addSubItemSidebar(id: any) {
		this.router.navigateByUrl(`/admin/sidebar/newsubitem/${id}`);
	}
	click_deleteItemSidebar(id: any) {

		Swal.fire({
			title: 'Estas seguro?',
			text: "Ya no podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'No, cancelar!',
			confirmButtonColor: '#6a1b9a',
			cancelButtonColor: '#CC0000',
			reverseButtons: true
		}).then((result) => {


			let options = {
				headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({ "id": id })
			};
			if (result.value) {
				this.svcMenuSidebar.deleteItemSidebar(options).subscribe((data: any) => {
					this.getAllItemSidebar();
				});
			} else {
				Swal.fire(
					'Cancelado',
					'El Item se encuentra seguro',
					'error'
				);
			}
		});


	}
	click_deleteSubItemSidebar(id: any, titleSubmenu: string) {
		Swal.fire({
			title: 'Estas seguro?',
			text: "Ya no podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'No, cancelar!',
			confirmButtonColor: '#6a1b9a',
			cancelButtonColor: '#CC0000',
			reverseButtons: true
		}).then((result) => {


			let options = {
				headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({ "id": id, "titleSubmenu": titleSubmenu })
			};
			console.log(options);
			if (result.value) {
				this.svcMenuSidebar.deleteSubItemSidebar(options).subscribe((data: any) => {
					this.getAllItemSidebar();
				});
			} else {
				Swal.fire(
					'Cancelado',
					'El Item se encuentra seguro',
					'error'
				);
			}
		});
	}
	click_updateItemSidebar(id: any) {
		this.router.navigateByUrl(`/admin/sidebar/update/${id}`);
	}
	click_updateSubItemSidebar(id: any) {
		this.router.navigateByUrl(`/admin/sidebar/updatesubitem/${id}`);
	}


	getAllItemSidebar() {
		const token = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			this.svcMenuSidebar.getSidebarMenusWithToken(token).subscribe((response: any) => {
				this.menuSideBar = response.data
			});
		} else {
			this.svcMenuSidebar.getSidebarMenusWithoutToken().subscribe((response: any) => {
				this.menuSideBar = response.data
				console.log(response.data);
			});
		}
	}

}
