import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../services/core/login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

	constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient, private loginSvc: LoginService) { }

	async canActivate() {

		const token = localStorage.getItem("jwt");
		const token_decode = this.jwtHelper.decodeToken(token);
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			return true;
		}

		const isRefreshSuccess = await this.tryRefreshingTokens(token);
		if (!isRefreshSuccess) {
			sessionStorage.removeItem("Id_User");
			this.router.navigate(["login"]);
		}

		return isRefreshSuccess;
	}

	private async tryRefreshingTokens(token: string): Promise<boolean> {
		const credentials = JSON.stringify({ AccessToken: token, RefreshToken: localStorage.getItem("refreshToken") });

		let isRefreshSuccess: boolean;
		try {
			const response = await this.loginSvc.refreshToken(credentials);
			// If token refresh is successful, set new tokens in local storage.
			const newToken = (<any>response).body.token;
			const newRefreshToken = (<any>response).body.refreshToken;
			localStorage.setItem("jwt", newToken);
			localStorage.setItem("refreshToken", newRefreshToken);
			isRefreshSuccess = true;
		}
		catch (ex) {
			isRefreshSuccess = false;
		}
		return isRefreshSuccess;
	}

}
