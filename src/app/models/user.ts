export class User {
    id: number;
    firstName: string;
    lastname: string;
    email: string;
    nick: string;
    role: string;
    password: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    imagen: string;
    phone: string;

    constructor(id:number=0,firstName:string, lastname:string, email:string, nick:string, 
        role:string="CLIENT", password:string, address:string,city:string="",state:string="",country:string="",zip:string="",imagen:string="",phone:string="") {
        this.id=id;
        this.firstName =firstName;
        this.lastname = lastname;
        this.email=email;
        this.nick= nick;
        this.role= role;
        this.password= password;
        this.address= address;
        this.city= city;
        this.state= state;
        this.country= country;
        this.zip= zip;
        this.imagen= imagen;
        this.phone= phone;
    }
   
    
  }