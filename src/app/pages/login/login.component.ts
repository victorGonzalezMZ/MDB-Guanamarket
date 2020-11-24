import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { sha256} from 'js-sha256';
import { LoginService } from 'src/app/services/core/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient,private loginSvc:  LoginService) { }

  ngOnInit(): void {
  }

  public login = (form: NgForm) => {

		const obj = {
			ID: 0,
			Nick: form.value.Nick,
			Password: sha256(form.value.Password)
		};

		this.loginSvc.authenticateUser(obj).subscribe(response => {
			const token = (<any>response).token;
			const refreshToken = (<any>response).refreshToken;
			localStorage.setItem("jwt", token);
			localStorage.setItem("refreshToken", refreshToken);
			this.invalidLogin = false;
			this.router.navigate(["/"]);
		}, err => {
			this.invalidLogin = true;
		});
	}


}
