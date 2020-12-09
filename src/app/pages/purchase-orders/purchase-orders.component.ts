import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SalesService } from 'src/app/services/core/sales.service';

@Component({
	selector: 'app-purchase-orders',
	templateUrl: './purchase-orders.component.html',
	styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
	
	idUser: number;
	
	elements: any = [];
	listS: any = [];
	listSd: any = [];
	listSt: any = [];
	s: any = [];
	isLogueado:boolean;
	
	indexGlobal:any;

	pagerList:any;
	
	itemPerPaginate: number;
	salesList = [];
	
	defaultBindingsList = [
		{ value: 0, name: 'Todos'},
		{ value: 1, name: 'Pendientes Envio'},
		{ value: 2, name: 'En Camino'},
		{ value: 3, name: 'Enviado'}
	];

	statusShipment = null;

	constructor(private router: Router,
				private SaleSvc: SalesService,
				private jwtHelper: JwtHelperService) {
	}

	ngOnInit(): void {

		this.statusShipment = this.defaultBindingsList[0];
		this.indexGlobal =1;
		this.itemPerPaginate = 5;
		this.pagerList = '';

		if(this.isLogueadoUser()){
			this.idUser = parseInt(sessionStorage.getItem("Id_User"));
			this.getAllShopingbyUser(this.idUser);
		}
	}

	isLogueadoUser(){
		const token = localStorage.getItem("jwt");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			return true;
		}
		return false;
	}

	getAllShopingbyUser(idUser) {
		this.SaleSvc.getAllUserID(1,this.itemPerPaginate,parseInt(this.statusShipment.value),idUser).subscribe((response:any)=>{
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		})
		
	}

	getDataPagination(index:number){
		this.SaleSvc.getAllUserID(index,this.itemPerPaginate,parseInt(this.statusShipment.value),this.idUser).subscribe((response: any) => {
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		});
	}

	onChange(index:number){
		this.indexGlobal = index;
	}

	changeByShipment(){
		this.SaleSvc.getAllUserID(this.indexGlobal,this.itemPerPaginate,parseInt(this.statusShipment.value),this.idUser).subscribe((response:any)=>{
			this.salesList = response.data.data;
			this.pagerList = response.data.pager;
		})
	}

	public searchOrderPurchase(search:any){
		if(search){
			const obj ={
				uid: search
			}
			
			this.SaleSvc.getSaleById(obj).subscribe((response: any) => {
				var data_:any =[];
				data_.push(response.data)	
				this.salesList = data_;
				this.pagerList = '';
			});
		}else{
			this.getAllShopingbyUser(this.idUser);
		}
		
	}
  
	viewOrder(id:any){
		this.router.navigateByUrl(`/shipment-order/${id}`);
	}





}
