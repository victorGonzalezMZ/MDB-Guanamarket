import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/core/users.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

	listUsers: any[] = [];

	constructor(private userSvc: UsersService) { }

	ngOnInit(): void {
		this.getAllUsers();
	}

	getAllUsers() {
		this.userSvc.getAllUsers().subscribe((data: any) => {
			this.listUsers = data;
			console.log(data);
		});
	}
}
