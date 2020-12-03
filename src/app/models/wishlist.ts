export class WishList {
    Id: number;
    iD_User: number;
    id_Product: number;
   

    constructor(id:number=0, id_user:number,  id_product:number) {
        this.Id = id
        this.iD_User = id_user
        this.id_Product = id_product
    }
    
  }