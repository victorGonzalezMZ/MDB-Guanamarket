export class ShoppingCart {
    id: number;
    iD_User: number;
    iD_Product: number;
    quantity: number;
  

    constructor(id = 0, id_user, id_product, quantity) {
        this.id = id
        this.iD_User = id_user,
        this.iD_Product = id_product,
        this.quantity = quantity
       
    }

  }
  