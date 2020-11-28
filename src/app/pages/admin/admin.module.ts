import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { AdminRoutesModule } from './admin.routes';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { NgFloatingActionMenuModule } from 'ng-floating-action-menu';
import { NgSelectModule } from '@ng-select/ng-select';
import { NewproductComponent } from './products/newproduct/newproduct.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewcategoryComponent } from './categories/newcategory/newcategory.component';

@NgModule({
	declarations: [
		AdminComponent,
		MainComponent,
		UsersComponent,
		ProductsComponent,
		NewproductComponent,
		CategoriesComponent,
		NewcategoryComponent,
	],
	imports: [
		CommonModule,
		NgSelectModule,
		AdminRoutesModule,
		FormsModule,
		NgFloatingActionMenuModule,
	]
})
export class AdminModule { }