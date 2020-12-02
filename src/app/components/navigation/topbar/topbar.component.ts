import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';
import { ViewChild } from '@angular/core';
import { ItemCarritomessengerService } from 'src/app/services/observables/item-carritomessenger.service';

const jwtHelper = new JwtHelperService();

@Component({
	selector: 'navigation-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})


export class TopbarComponent implements OnInit {


	userAuthenticaded:boolean=false;
	cartNoItems:number=0;

	@Input() menuProfileItems: any[] = [];
	
	subscription$: Subscription;
	subscriptionItemsCarrito$: Subscription;


	constructor(private router: Router,
				private svcLogin: LoginmessengerService,
				private jwtHelper: JwtHelperService,
				private svcItemCarrito: ItemCarritomessengerService) { 
		
		this.subscription$ = this.svcLogin.onListenCriterio().subscribe( (criterio:boolean)=>{
			
			this.userAuthenticaded =criterio;
		
		});	

		this.subscriptionItemsCarrito$ = this.svcItemCarrito.onListenNoItems().subscribe( (noItems:number)=>{
			this.cartNoItems = noItems;
		});
	}
	

	ngOnInit(): void {
		this.userAuthenticaded = this.isUserAuthenticated();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}


	public logOut = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("refreshToken");
		this.userAuthenticaded = false;
		sessionStorage.removeItem("Id_User");
		window.location.reload();
	}

	isUserAuthenticated() {
		const token: string = localStorage.getItem("jwt");
		const token_decode = this.jwtHelper.decodeToken(token);
		console.log(token_decode);
		
		if (token && !jwtHelper.isTokenExpired(token))
			return true;
		else 
			return false;
	}

	isRevise(){
		this.cartNoItems=this.cartNoItems+1;
	}

}
