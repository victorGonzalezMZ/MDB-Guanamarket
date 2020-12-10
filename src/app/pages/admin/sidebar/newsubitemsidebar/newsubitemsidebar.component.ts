import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuSidebarService } from 'src/app/services/core/menu-sidebar.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-newsubitemsidebar',
	templateUrl: './newsubitemsidebar.component.html',
	styleUrls: ['./newsubitemsidebar.component.scss']
})
export class NewsubitemsidebarComponent implements OnInit {

	icon: string;
	_id: number;
	constructor(private svcMenuSidebar: MenuSidebarService, private router: ActivatedRoute,) {
		this.router.params.subscribe(params => {
			this._id = (params['id']);

		});
	}

	ngOnInit(): void {
		this.icon = "";
	}
	onChangeIcon(icon: string) {
		this.icon = icon;
	}
	registerNewSubSidebar(form: NgForm) {

		const obj = {
			"id": this._id,
			"isInit": false,
			"collapseItem": [{
				"title": form.value.title,
				"icon": form.value.icon,
				"route": form.value.route,
				"type": form.value.type,
			}]
		};

		this.svcMenuSidebar.registerNewSubItemSidebar(obj).subscribe(response => {
			if (response) {
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
