import { Component,OnInit } from '@angular/core';
import { MenuTopbarService } from './services/core/menu-topbar.service';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

declare var App: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'GuanaMarket Store';
	menuItems:any[] = [];

	constructor(private menuSvc: MenuTopbarService) {}

	ngOnInit() {
		App.init();
		this.getData();
		console.log('data prueba');
	}

	getData(){
		this.menuSvc.getItemsMenu().subscribe((data: any)=>{
			this.menuItems = data.menus;
		});

	}

	isUserAuthenticated() {
		const token: string = localStorage.getItem("jwt");
		if (token && !jwtHelper.isTokenExpired(token)) {
			return true;
		}
		else {
			return false;
		}
	}

}
