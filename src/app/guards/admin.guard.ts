import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(private jwtHelper: JwtHelperService){}
	async canActivate() {
		const token = localStorage.getItem("jwt");
		const token_decode = this.jwtHelper.decodeToken(token);
		if(token_decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'ADMIN'){
			return true;
		}else{
			return false;
		}
	}

}
