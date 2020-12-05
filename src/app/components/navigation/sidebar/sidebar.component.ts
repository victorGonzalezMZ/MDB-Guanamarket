import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuSidebarService } from 'src/app/services/core/menu-sidebar.service';
import * as $ from 'jquery';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'navigation-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input() imagenAvatar: string = ""
	menuSideBar: any[] = [];
	subscription$: Subscription;

	constructor(private svcMenuSidebar: MenuSidebarService,
				private jwtHelper: JwtHelperService,
				private svcLogin: LoginmessengerService) { 

					this.subscription$ = this.svcLogin.onListenCriterio().subscribe( (criterio:boolean)=>{
						this.isLogueadoUser();
					});	
		}

	ngOnInit(): void {
		this.isLogueadoUser();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe(); 
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
