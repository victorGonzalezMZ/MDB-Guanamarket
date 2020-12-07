import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/core/checkout.service';

@Component({
	selector: 'app-purchase-orders',
	templateUrl: './purchase-orders.component.html',
	styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
	idUser: number;
	headElements = ['Compra', 'Detalles', 'Total',];
	elements: any = [];
	listS: any = [];
	listSd: any = [];
	listSt: any = [];
	s: any = [];
	constructor(private checkoutSvc: CheckoutService) {
	
	}

	ngOnInit(): void {
		this.idUser = parseInt(sessionStorage.getItem("Id_User"));
		this.getAllShopingbyUser(this.idUser);
	}

	getAllShopingbyUser(idUser) {
		this.checkoutSvc.getAllShoppingbyUser(idUser).subscribe((data: any) => {
			for (let i in data) {
				this.elements.push({ sale: JSON.parse(data[i].sale), sale_detail: JSON.parse(data[i].sale_detail), total: JSON.parse(data[i].sale_total) });
			}

		});
	}

}
