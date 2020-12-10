import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuSidebarService } from 'src/app/services/core/menu-sidebar.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-updateitemsidebar',
	templateUrl: './updateitemsidebar.component.html',
	styleUrls: ['./updateitemsidebar.component.scss']
})
export class UpdateitemsidebarComponent implements OnInit {
	_id: number;
	icon: string;
	public updateSidebarForm: FormGroup = this.fb.group({
		title: [],
		icon: [],
		route: [],
		type: []
	});
	constructor(private fb: FormBuilder, private router: ActivatedRoute,
		private svcMenuSidebar: MenuSidebarService,
		private routerLink: Router) {
		this.icon = "";
		this.router.params.subscribe(params => {
			this._id = (params['id']);
			this.getSidebar((params['id']));
		});
	}

	ngOnInit(): void {
	}
	onChangeIcon(icon: string) {
		this.icon = icon;
	}
	getSidebar(id: string) {

		this.svcMenuSidebar.getSidebar(id).subscribe((r: any) => {
			console.log(r.data);
			this._id = r.data[0]._id;

			this.updateSidebarForm.setValue({

				title: r.data[0].title.toString(),
				icon: r.data[0].icon,
				route: r.data[0].route,
				type: r.data[0].type,
			});
			this.onChangeIcon(r.data[0].icon);
		});
	}
	public updateItemSiedbar() {
		const obj = {
			"id": this._id,
			"title": this.updateSidebarForm.value.title,
			"icon": this.updateSidebarForm.value.icon,
			"route": this.updateSidebarForm.value.route,
			"type": this.updateSidebarForm.value.type,
		};

		this.svcMenuSidebar.updateItemSidbar(obj).subscribe(response => {
			console.log(response);
			if (response["code"] == 200) {
				Swal.fire(
					'Bien hecho!',
					`Tu Sidebar con ID ${this._id} fue actualizado correctamente!`,
					'success'
				)
				this.routerLink.navigateByUrl(`/admin/sidebar`);
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
