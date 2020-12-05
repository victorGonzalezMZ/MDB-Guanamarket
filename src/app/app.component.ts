import { Component,OnInit } from '@angular/core';
import { MenuTopbarService } from './services/core/menu-topbar.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import settings from 'src/app/settings';
import { AvatarmessengerService } from './services/observables/avatarmessenger.service';
import { LoginService } from './services/core/login.service';
import { UsersService } from './services/core/users.service';
import { Subscription } from 'rxjs';
import { LoginmessengerService } from './services/observables/loginmessenger.service';

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

	subscription$: Subscription;
	subscriptionLogin$: Subscription;
	constructor(private menuSvc: MenuTopbarService,
				private jwtHelper: JwtHelperService,
				private svcAvatar: AvatarmessengerService,
				private userSvc: UsersService,
				private svcLogin: LoginmessengerService) {

					this.subscriptionLogin$ = this.svcLogin.onListenCriterio().subscribe( (criterio:boolean)=>{
						this.isUserAuthenticated();
					});	
	}

	ngOnInit() {
		App.init();
		this.getData();
		this.isUserAuthenticated();
		this.subscription$ = this.svcAvatar.onListenChangeAvar().subscribe( async (imagen:string)=>{
			this.isUserAuthenticated();
		})
	}
	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriptionLogin$.unsubscribe();
		
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
			this.userSvc.getUserByNick(token_decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]).subscribe( (data:any)=>{
				this.imagenAvatar = this.imagesUrl+data.user.imagen;
			});
			
			return true;
		}else {
			this.imagenAvatar= this.imagesUrl+'no-image-avatar.jpeg';
			return false;
		}
	}


}
