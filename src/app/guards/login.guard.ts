import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../services/core/login.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient, private loginSvc: LoginService) { }

	async canActivate() {
		const token: string = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token))
			return false;
		else
			return true;

	}

}
