import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { sha256 } from 'js-sha256';
import { LoginService } from 'src/app/services/core/login.service';
import { UsersService } from 'src/app/services/core/users.service';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

	invalidRegister: boolean;
	newId: BigInteger;

	constructor(private router: Router, private userSvc: UsersService, private loginSvc: LoginService,
		private svcLogin: LoginmessengerService,
		private jwtHelper: JwtHelperService) { }

	registerNewClient(form: NgForm) {

		if (sha256(form.value.password) == sha256(form.value.password_repeat)) {
			const obj = {
				"nick": form.value.nick,
				"email": form.value.email,
				"firstName": form.value.firstName,
				"lastname": form.value.lastname,
				"password": sha256(form.value.password),
				"role": 'CLIENT',
				"address": "",
				"city": "",
				"state": "",
				"country": "",
				"zip": "",
				"imagen": "imagen.png",
				"phone":""
			};

			console.log(JSON.stringify(obj));
			this.userSvc.registerNewUser(obj).subscribe(response => {
				if (response > 0) {
					const obj_login = {
						ID: response,
						Nick: obj.nick,
						Password: obj.password
					};

					this.loginSvc.authenticateUser(obj_login).subscribe(response => {
						const token = (<any>response).token;
						const refreshToken = (<any>response).refreshToken;
						const token_decode = this.jwtHelper.decodeToken(token);
						localStorage.setItem("jwt", token);
						localStorage.setItem("refreshToken", refreshToken);
						sessionStorage.setItem("Id_User",token_decode.Id);
						sessionStorage.setItem("nick",token_decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
						this.invalidRegister = false;
						this.svcLogin.sendCriterio(true);
						this.router.navigate(["/home"]);

					}, err => {
						this.invalidRegister = true;
					});
				}
			}, err => {
				this.invalidRegister = true;
			});

		} else {
			this.invalidRegister = true;
		}
	}

}
