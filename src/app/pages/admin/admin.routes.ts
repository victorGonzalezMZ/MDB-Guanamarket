import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { NewproductComponent } from './products/newproduct/newproduct.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {   
        path: '', 
        component: AdminComponent,
        children:[
            {path: 'main', component: MainComponent},    
            {path: 'users', component: UsersComponent,canActivate: [AuthGuardGuard] }, 
            {path: 'products', component: ProductsComponent},
            {path: 'products/new', component:  NewproductComponent}  
        ]
    }, 
    
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutesModule { }