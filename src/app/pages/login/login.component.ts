import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { sha256 } from 'js-sha256';
import { LoginService } from 'src/app/services/core/login.service';
import { LoginmessengerService } from 'src/app/services/observables/loginmessenger.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	invalidLogin: boolean;
	remember:boolean=false;

	public loginForm: FormGroup = this.fb.group({
		Nick:[ localStorage.getItem("Nick") || ''],
		Password:[''],
		Remember: [this.recuerdameCheck()],
	});

	constructor(private router: Router,
		private loginSvc: LoginService,
		private svcLogin: LoginmessengerService,
		private jwtHelper: JwtHelperService,
		private fb: FormBuilder) { }
  
	

	public recuerdameCheck(){
		if(localStorage.getItem("Nick")){
			return true;
		}
		return false;
	}
	public login ()  {

		const obj = {
			ID: 0,
			Nick: this.loginForm.get('Nick').value,
			Password: sha256(this.loginForm.get('Password').value)
		};

		this.loginSvc.authenticateUser(obj).subscribe(response => {
			const token = (<any>response).token;
			const refreshToken = (<any>response).refreshToken;
			localStorage.setItem("jwt", token);
			localStorage.setItem("refreshToken", refreshToken);
			this.invalidLogin = false;
			this.svcLogin.sendCriterio(true);
			if(this.loginForm.get('Remember').value){
				localStorage.setItem("Nick",this.loginForm.get('Nick').value);
			}else{
				localStorage.removeItem("Nick");
			}
	
			const token_decode = this.jwtHelper.decodeToken(token);
			console.log(token_decode);
			sessionStorage.setItem("Id_User",token_decode.Id);
			sessionStorage.setItem("nick",token_decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
			this.router.navigate(["/home"]);
		}, err => {
			this.invalidLogin = true;
		});
	}


}
