import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/services/core/sales.service';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

	constructor(private svcSale: SalesService,	private router: Router) { }
	salesList = [];
	pagerList: any;
	itemPerPaginate: number;
	
	statusShipment = null;

	defaultBindingsList = [
		{ value: 0, name: 'Todos'},
		{ value: 1, name: 'Pendientes Envio'},
		{ value: 2, name: 'En Camino'},
		{ value: 3, name: 'Enviado'}
	];

	indexGlobal:any;

	ngOnInit(): void {
		this.itemPerPaginate = 5;
		this.indexGlobal =1;
		this.statusShipment = this.defaultBindingsList[0];
		this.getDataIni();
	}

	onChange(index:number){
		
		this.indexGlobal = index;
	}

	changeByShipment(){
		this.svcSale.getAllAdmin(this.indexGlobal,this.itemPerPaginate,parseInt(this.statusShipment.value)).subscribe((response: any) => {
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		})
	}

	public searchOrderPurchase(search:any){
		if(search){
			const obj ={
				uid: search
			}
			
			this.svcSale.getSaleById(obj).subscribe((response: any) => {
				var data_:any =[];
				data_.push(response.data)	
				this.salesList = data_;
				this.pagerList = '';
			});
		}else{
			this.getDataIni();
		}
		
	}
  

	getDataIni() {
		this.svcSale.getAllAdmin(1,this.itemPerPaginate,parseInt(this.statusShipment.value)).subscribe((response: any) => {
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		});
	}

	getDataPagination(index:number){
		this.svcSale.getAllAdmin(index,this.itemPerPaginate,parseInt(this.statusShipment.value)).subscribe((response: any) => {
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		});
	}

	editOrder(id:any){
		this.router.navigateByUrl(`/admin/sales/update/${id}`);
	}

}
