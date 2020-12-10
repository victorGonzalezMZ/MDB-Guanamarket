import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuSidebarService } from 'src/app/services/core/menu-sidebar.service';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-newitemsidebar',
	templateUrl: './newitemsidebar.component.html',
	styleUrls: ['./newitemsidebar.component.scss']
})
export class NewitemsidebarComponent implements OnInit {

	icon: string;
	constructor(private svcMenuSidebar: MenuSidebarService) { }

	ngOnInit(): void {
		this.icon = "";
	}
	onChangeIcon(icon: string) {
		this.icon = icon;
	}
	registerNewSidebar(form: NgForm) {

		const obj = {
			"title": form.value.title,
			"icon": form.value.icon,
			"route": form.value.route,
			"type": form.value.type,
			"isInit": true,
			"collapseItem": []
		};

		this.svcMenuSidebar.registerNewItemSidebar(obj).subscribe(response => {
			if (response["rowsAffected"] > 0) {
				Swal.fire(
					'Bien hecho!',
					`Nuevo item Sidebar fue registrado correctamente!`,
					'success'
				)
			}
			else {
				Swal.fire({
					icon: 'warning',
					title: 'No registrado...',
					text: 'Sidebar Inválido',
				});
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
