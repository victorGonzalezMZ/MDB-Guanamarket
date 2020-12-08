import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/services/core/sales.service';
import settings from '../../settings';

@Component({
	selector: 'app-shipment-confirmation',
	templateUrl: './shipment-confirmation.component.html',
	styleUrls: ['./shipment-confirmation.component.scss']
})
export class ShipmentConfirmationComponent implements OnInit {

	numePedido:any;
	pedidoList:any;
	imagesUrl = settings.apinode.urlPhotoServer;
	
	constructor(private router: ActivatedRoute,
				private saleSvc: SalesService) {
		this.router.params.subscribe(params => {
			this.numePedido = params['id'];
		});
	}

	ngOnInit(): void {
		this.getData(this.numePedido);
	}

	getData(id:any){	
		const obj={"uid":id}
		this.saleSvc.getSaleById(obj).subscribe((response: any) => {
			console.log(response);
			this.pedidoList = response.data;
		});
	}
}
