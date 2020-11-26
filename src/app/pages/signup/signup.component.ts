import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { sha256 } from 'js-sha256';
import { LoginService } from 'src/app/services/core/login.service';
import { UsersService } from 'src/app/services/core/users.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

	invalidRegister: boolean;
	newId: BigInteger;

	constructor(private router: Router, private userSvc: UsersService, private loginSvc: LoginService) { }

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
				"imagen": ""
			};

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
						localStorage.setItem("jwt", token);
						localStorage.setItem("refreshToken", refreshToken);
						this.invalidRegister = false;
						this.router.navigate(["/"]);
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
