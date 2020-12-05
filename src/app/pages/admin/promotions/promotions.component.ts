import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PromotionsService } from 'src/app/services/core/promotions.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  headElements = ['ID', 'TÍTULO', 'CODIGO', 'DESCRIPCIÓN', 'FECHA EXPIRACIÓN', 'TEMA', 'DESCUENTO','ACCIONES'];
  elements: any = [];

  constructor(private promotionSvc: PromotionsService, private router: Router) {

    this.getAllPromotions();
  }

  ngOnInit(): void {
  }

  click_addPromotion() {
    this.router.navigateByUrl('/admin/promotions/new');
  }
  getAllPromotions() {
    this.promotionSvc.getAllPromotion().subscribe((data: any) => {
      this.elements = data;
    });
  }
  click_deletePromotion(id: any) {
    console.log(id);
    Swal.fire({
      title: 'Estas seguro?',
      text: "Ya no podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#6a1b9a',
      cancelButtonColor: '#CC0000',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.promotionSvc.deletePromotion(id).subscribe((data: any) => {
          this.getAllPromotions();
        });
      } else {
        Swal.fire(
          'Cancelado',
          'El Item se encuentra seguro',
          'error'
        );
      }
    });


  }

  click_updatePromotion(id: any) {
    this.router.navigateByUrl(`/admin/promotions/update/${id}`);
  }
  
}
