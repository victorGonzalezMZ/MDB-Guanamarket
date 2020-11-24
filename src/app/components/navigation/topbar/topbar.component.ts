import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const jwtHelper = new JwtHelperService();

@Component({
	selector: 'navigation-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})


export class TopbarComponent implements OnInit {


	@Input() menuProfileItems: any[] = [];


	constructor(private router: Router) { }

	ngOnInit(): void {
		
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

	public logOut = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("refreshToken");
	}

}
