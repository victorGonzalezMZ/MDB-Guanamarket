import { Component, OnInit } from '@angular/core';
import { WishListService } from 'src/app/services/core/wish-list.service';
import { WishlistmessengerService } from 'src/app/services/observables/wishlistmessenger.service';
import { WishList} from 'src/app/models/wishlist';

@Component({
  selector: 'orquestador-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(private svcWishList: WishlistmessengerService,
			private WishListsvc: WishListService) { }

  ngOnInit(): void {
    
    this.svcWishList.onListenProductInWishList().subscribe( (item:any)=>{
		const obj:WishList = new WishList(0,parseInt(sessionStorage.getItem("Id_User")),item.id);
		this.WishListsvc.addItemWishList(obj).subscribe((data: any) => {
			
		});
		
	})
  }

}
