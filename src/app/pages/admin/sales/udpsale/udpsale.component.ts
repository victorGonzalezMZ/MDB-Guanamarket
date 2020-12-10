import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/services/core/sales.service';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-udpsale',
	templateUrl: './udpsale.component.html',
	styleUrls: ['./udpsale.component.scss']
})
export class UdpsaleComponent implements OnInit {

	_id:any;
	_pedidoList:any;
	defaultBindingsList = [
		{ value: 1, name: 'Pendiente Envío'},
		{ value: 2, name: 'En Camino'},
		{ value: 3, name: 'Entregado'}
	];

	defaultBindingsListPaqueterias = [
		{ value: 'Fedex', name: 'Fedex'},
		{ value: 'Estafeta', name: 'Estafeta'},
		{ value: 'UPS', name: 'UPS'},
		{ value: 'DHL', name: 'DHL'},
		{ value: 'AMPM', name: 'AMPM'},
		{ value: 'Castores', name: 'Castores'},
	];

	public SaleForm: FormGroup = this.fb.group({
		_id: [],
		date_purchase: [],
		address: [],
		city: [],
		state:[],
		country:[],
		status_shipment:[],
		zip:[],
		phone:[],
		email:[],
		service_shipment:[],
		date_delivery:[],
		guia_shipment:[]

	});

	constructor(private router: ActivatedRoute, private fb: FormBuilder,
		private saleSvc: SalesService,
		private routerLink: Router) {
		this.router.params.subscribe(params => {
			this._id = params['id'];
		});

	}

	/*
		"data": {
			"_id": "5fcec3731d13fd25c8a6ebb0",
			"id_user": 11,
			"firstname": "Emmanuel",
			"lastname": "Noriega",
			"email": "emmanuel.noriegav@gmail.com",
			"address": "Mina Sur #412",
			"state": "Guanajuato",
			"zip": "99123",
			"phone": "1234567890",
			"code": "FIN2020",
			"paymentMethod": "credit",
			"totalItems": 5,
			"amountPay": 3120.0312,
			"sale_detail": [
				{
					"id": 2400,
					"brand": "KONE CARE",
					"title": "BLOQUEADOR SOLAR F 35",
					"seelingPrice": 350,
					"image": "Xq-M-q0QJ_E4hbYc87in3Z5N.png",
					"quantity": 1,
					"monto": 350
				},
				{
					"id": 2100,
					"brand": "KONE CARE",
					"title": "CREMA ANTIEDAD CON ÁCIDO HIALURONICO",
					"seelingPrice": 495.5,
					"image": "067348fb785d8aa44eea80fa627de389.jpg",
					"quantity": 1,
					"monto": 495.5
				},
				{
					"id": 2300,
					"brand": "KONE CARE",
					"title": "SUERO ANTI ESTRÍAS",
					"seelingPrice": 300.99,
					"image": "mAw9Zp4NrXpH6kyiYacKKnO7.png",
					"quantity": 1,
					"monto": 300.99
				},
				{
					"id": 2700,
					"brand": "FLEXI",
					"title": "Sneaker Casual Sport Flexi Con Suela Extra Ligera Para Hombre - Estilo 403701 Gris",
					"seelingPrice": 1299,
					"image": "rdCgGw0Oo6PxGtu1qTE9wLFk.jpg",
					"quantity": 1,
					"monto": 1299
				},
				{
					"id": 2500,
					"brand": "FLEXI",
					"title": "Sneaker Casual Sport Flexi De Tipo Calcetín Para Hombre - Estilo 403802 Negro",
					"seelingPrice": 1100,
					"image": "4vMIZzjPweDjqJDt8tjC5HCt.jpg",
					"quantity": 1,
					"monto": 1100
				}
			],
			"status_shipment": 1,
			"guia_shipment": "",
			"service_shipment": "",
			"date_delivery": "",
			"amountPayOriginal": 3545.49,
			"descount": 12,
			"date_purchase": "2020-12-08T00:06:11.927Z"
		}
		*/
	getData(id:any){	
		const obj={"uid":id}
		this.saleSvc.getSaleById(obj).subscribe((response: any) => {
			console.log(response);
			this._pedidoList = response.data;
			this.SaleForm.setValue({
				_id: this._pedidoList._id,
				date_purchase: this._pedidoList.date_purchase,
				address: this._pedidoList.address,
				city: this._pedidoList.city,
				state: this._pedidoList.state,
				country: this._pedidoList.country,
				status_shipment: this._pedidoList.status_shipment,
				phone: this._pedidoList.phone,
				zip: this._pedidoList.zip,
				email: this._pedidoList.email,
				service_shipment: this._pedidoList.service_shipment,
				guia_shipment: this._pedidoList.guia_shipment,
				date_delivery: this._pedidoList.date_delivery
			});
		});
	}


	ngOnInit(): void {
		this.getData(this._id );
	}

	updateSale(){
		const obj = {
			"uid":this._id, 
			"guia_shipment":this.SaleForm.value.guia_shipment, 
			"service_shipment":this.SaleForm.value.service_shipment,
			"date_delivery":this.SaleForm.value.date_delivery,
			"status_shipment": parseInt(this.SaleForm.value.status_shipment)
		}

		this.saleSvc.editSendMethod(obj).subscribe((response:any)=>{
			if(response.data.lastErrorObject.updatedExisting){ 
				Swal.fire(
					'Bien hecho!',
					`La orden de venta ${this._id} fue actualizada correctamente`,
					'success'
				);
				this.routerLink.navigateByUrl(`/admin/sales`);
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Oopss...',
					text: `La orden de venta ${this._id} NO fue actualizada correctamente`
				});
			}

		})
	}

}
