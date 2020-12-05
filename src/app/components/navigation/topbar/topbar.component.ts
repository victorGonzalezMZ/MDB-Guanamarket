import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Subscription } from 'rxjs';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';
import { ItemCarritomessengerService } from 'src/app/services/observables/item-carritomessenger.service';
import * as $ from 'jquery';


const jwtHelper = new JwtHelperService();

@Component({
	selector: 'navigation-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})


export class TopbarComponent implements OnInit {


	cartNoItems:number=0;

	@Input() menuProfileItems: any[] = [];
	@Input() imagenAvatar: string = ""

	subscription$: Subscription;
	subscriptionItemsCarrito$: Subscription;

	itemsMenusDes: any[] = [];

	defaultBindingsListAuth = [
		{ value: 0, name: 'Mi Cuenta', icon: "fa fa-cog", route:"/profile", isLogout:false},
		{ value: 1, name: 'Cerrar Sesión', icon: "fas fa-sign-in-alt", route:"/logout", isLogout:true },
	];

	defaultBindingsListNotAuth = [
		{ value: 0, name: 'Iniciar Sesión', icon: "far fa-user", route:"/login",isLogout:false },
		{ value: 1, name: 'Registrate', icon:"fas fa-user-plus", route:"/signup",isLogout:false },
	];

	constructor(private router: Router,
				private svcLogin: LoginmessengerService,
				private jwtHelper: JwtHelperService,
				private svcItemCarrito: ItemCarritomessengerService) { 
		
		this.subscription$ = this.svcLogin.onListenCriterio().subscribe( (criterio:boolean)=>{
			this.isUserAuthenticated();
		});	

		this.subscriptionItemsCarrito$ = this.svcItemCarrito.onListenNoItems().subscribe( (noItems:number)=>{
			this.cartNoItems = noItems;
		});
	}
	

	ngOnInit(): void {
		this.isUserAuthenticated();
		
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriptionItemsCarrito$.unsubscribe();
	}


	public logOut = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("refreshToken");
		sessionStorage.removeItem("Id_User");
		localStorage.removeItem("Nick");
		this.isUserAuthenticated();
		window.location.reload();
	}

	isUserAuthenticated() {
		const token: string = localStorage.getItem("jwt");
		if (token && !jwtHelper.isTokenExpired(token)){
			this.itemsMenusDes =  this.defaultBindingsListAuth;
		}else{
			this.itemsMenusDes =  this.defaultBindingsListNotAuth;
		}
	}


}
