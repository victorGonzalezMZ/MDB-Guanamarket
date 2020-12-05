import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewcategoryComponent } from './categories/newcategory/newcategory.component';
import { UpdcategoryComponent } from './categories/updcategory/updcategory.component';
import { MainComponent } from './main/main.component';
import { NewproductComponent } from './products/newproduct/newproduct.component';
import { ProductsComponent } from './products/products.component';
import { UpdproductComponent } from './products/updproduct/updproduct.component';
import { NewuserComponent } from './users/newuser/newuser.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {   
        path: '', 
        component: AdminComponent,
        children:[
            {path: 'main', component: MainComponent},    
            {path: 'users', component: UsersComponent}, 
            {path: 'users/new', component: NewuserComponent}, 
            {path: 'products', component: ProductsComponent},
            {path: 'products/new', component:  NewproductComponent},
            {path: 'products/update/:id', component: UpdproductComponent},
            {path: 'categories', component: CategoriesComponent},
            {path: 'categories/new', component: NewcategoryComponent},
            {path: 'categories/update/:id', component: UpdcategoryComponent}


        ]
    }, 
    
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutesModule { }