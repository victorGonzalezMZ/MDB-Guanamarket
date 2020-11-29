import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';

const jwtHelper = new JwtHelperService();

@Component({
	selector: 'navigation-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})


export class TopbarComponent implements OnInit {


	userAuthenticaded:boolean=false;

	@Input() menuProfileItems: any[] = [];
	
	subscription$: Subscription;
	

	constructor(private router: Router,
				private svcLogin: LoginmessengerService) { 
		this.subscription$ = this.svcLogin.onListenCriterio().subscribe( (criterio:boolean)=>{
			this.userAuthenticaded =criterio;
			
		});	
	}
	ngRel

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
		window.location.reload();
	}

	isUserAuthenticated() {
		const token: string = localStorage.getItem("jwt");
		if (token && !jwtHelper.isTokenExpired(token))
			return true;
		else 
			return false;
	}

	isRevise(){
		console.log("Hola mundo");
	}

}
