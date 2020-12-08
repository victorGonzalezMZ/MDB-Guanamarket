import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/core/sales.service';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

	constructor(private svcSale: SalesService) { }
	salesList = [];
	pagerList: any;
	statusShipment: number;
	itemPerPaginate: number;

	ngOnInit(): void {
		this.statusShipment = 0;
		this.itemPerPaginate = 5;
		this.getDataIni();
	}

	getDataIni() {
		this.svcSale.getAllAdmin(1,this.itemPerPaginate,this.statusShipment).subscribe((response: any) => {
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		});
	}

	getDataPagination(index:number){
		this.svcSale.getAllAdmin(index,this.itemPerPaginate,this.statusShipment).subscribe((response: any) => {
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		});
	}

}
