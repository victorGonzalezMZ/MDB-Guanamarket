import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuSidebarService } from 'src/app/services/core/menu-sidebar.service';
import * as $ from 'jquery';

@Component({
	selector: 'navigation-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input() imagenAvatar: string = ""
	menuSideBar: any[] = [];

	constructor(private svcMenuSidebar: MenuSidebarService,
				private jwtHelper: JwtHelperService) { }

	ngOnInit(): void {
		this.isLogueadoUser();
	}

	
	isLogueadoUser(){
		const token = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			this.svcMenuSidebar.getSidebarMenusWithToken(token).subscribe((data:any)=>{
				this.menuSideBar = data.menus
			});
		}else{
			this.svcMenuSidebar.getSidebarMenusWithoutToken().subscribe((data:any)=>{
				this.menuSideBar = data.menus
				console.log(data.menus);
			});	
		}
	}

	ocultarMenus(){
		$('#sidebar').toggleClass('active');
	}


}
