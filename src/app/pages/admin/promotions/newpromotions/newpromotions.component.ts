import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PromotionsService } from 'src/app/services/core/promotions.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-newpromotions',
  templateUrl: './newpromotions.component.html',
  styleUrls: ['./newpromotions.component.scss']
})

export class NewpromotionsComponent implements OnInit{

  constructor( private promotionSvc: PromotionsService) { }

  ngOnInit(): void {
  }

  registerNewPromotion(form: NgForm) { 
    
      const obj = {        
        "title": form.value.title,
        "code": form.value.codigo,
        "description": form.value.description,
        "expires_date":  (form.value.expires_date),
        "theme": form.value.theme,
        "discount":parseInt( form.value.discount)
      };
      
      console.log(obj);
  
      this.promotionSvc.registerNewPromotion(obj).subscribe(response => {
        if(response>0){
          Swal.fire(
            'Bien hecho!',
            `La promocion  con ID # ${response} fue registrado correctamente!`,
            'success'
          )
        }
        else{
          Swal.fire({
            icon: 'warning',
            title: 'No registrado...',
            text: 'Código Inválido',
          });
        }
      }, err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err}`,
        });
      });
      

  
    }
  

}
