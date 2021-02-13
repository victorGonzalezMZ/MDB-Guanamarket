import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/services/core/sales.service';
import Swal from 'sweetalert2';
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
		{ value: 3, name: 'Entregado'}
	];

	indexGlobal:any;

	ngOnInit(): void {
		this.itemPerPaginate = 5;
		this.indexGlobal =1;
		this.pagerList = '';
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
			var fstChar = search.charAt(0);		
			
			if(fstChar == "#"){
				obj.uid = obj.uid.replace('#','');
				this.svcSale.getSaleById(obj).subscribe((response: any) => {
					var data_:any =[];
					data_.push(response.data)	
					this.salesList = data_;
					this.pagerList = '';
				});
			}else{
				if(fstChar == "@"){
					obj.uid = obj.uid.replace('@','');
					this.svcSale.getAllAdminEmail(this.indexGlobal,100000,obj.uid).subscribe((response: any) => {
						this.salesList = response.data.data;
						this.pagerList = response.data.pager;
					})
					
				}
			}
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

	deleteOrder(id:any){

		Swal.fire({
			title: 'Estas seguro?',
			text: "Ya no podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'No, cancelar!',
			confirmButtonColor: '#6a1b9a',
			cancelButtonColor:'#CC0000',
			reverseButtons: true
		}).then((result) => {	
			if(result.value){				
				this.svcSale.deleteOrder(id).subscribe((response:any)=>{
					Swal.fire(
						'Bien hecho!',
						`${response.msg}`,
						'success'
					);
					this.getDataIni();

				})
			}else{
				Swal.fire(
					'Cancelado',
					`La orden ${id}se encuentra segura =)`,
					'error'
				);
			}
		});

	}

}
