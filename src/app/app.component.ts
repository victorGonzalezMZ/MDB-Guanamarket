import { Component,OnInit } from '@angular/core';
import { MenuTopbarService } from './services/core/menu-topbar.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import settings from 'src/app/settings';

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
	imagenAvatar:string='';
	imagesUrl = settings.apinode.urlServer + 'get-image-user/';

	constructor(private menuSvc: MenuTopbarService,
				private jwtHelper: JwtHelperService) {}

	ngOnInit() {
		App.init();
		this.getData();
		this.imagenAvatar= this.imagesUrl+'no-image-avatar.jpeg';
		this.isUserAuthenticated();
	}

	getData(){
		this.menuSvc.getItemsMenu().subscribe((data: any)=>{
			this.menuItems = data.menus;
		});

	}

	isUserAuthenticated() {
		const token: string = localStorage.getItem("jwt");
		const token_decode = this.jwtHelper.decodeToken(token);
		if (token && !jwtHelper.isTokenExpired(token)) {
			this.imagenAvatar = this.imagesUrl+token_decode['imagen'];
			return true;
		}else {
			return false;
		}
	}

}
