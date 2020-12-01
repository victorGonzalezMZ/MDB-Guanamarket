export class Cart {
    id: number;
    brand: string;
    title: string;
    seelingPrice: number;
    image: string;
    quantity: number;
    monto: number;

    constructor(id, brand, title,  seelingPrice, image, quantity, monto) {
        this.id = id
        this.brand = brand
        this.title = title
        this.seelingPrice = seelingPrice
        this.image = image
        this.quantity = quantity
        this.monto = monto
    }
    
  }
  

 