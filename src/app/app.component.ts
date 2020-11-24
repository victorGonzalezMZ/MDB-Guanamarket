import { Component,OnInit } from '@angular/core';
import { MenuTopbarService } from './services/core/menu-topbar.service';

declare var App: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'GuanaMarket Store';
	menuItems:any[] = [];

	constructor(private menuSvc: MenuTopbarService) {}

	ngOnInit() {
		App.init();
		this.getData();
	
	}

	getData(){
		this.menuSvc.getItemsMenu().subscribe((data: any)=>{
			this.menuItems = data.menus;
		});

	}
}
