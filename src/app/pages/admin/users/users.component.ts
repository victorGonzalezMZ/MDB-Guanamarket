import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/core/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
