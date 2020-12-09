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
import { UpdcategoryComponent } from './categories/updcategory/updcategory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdproductComponent } from './products/updproduct/updproduct.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { NewuserComponent } from './users/newuser/newuser.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { NewpromotionsComponent } from './promotions/newpromotions/newpromotions.component';
import { UpdatepromotionsComponent} from './promotions/updatepromotions/updatepromotions.component';
import { SalesComponent } from './sales/sales.component';
import { UdpsaleComponent } from './sales/udpsale/udpsale.component';
@NgModule({
	declarations: [
		AdminComponent,
		MainComponent,
		UsersComponent,
		ProductsComponent,
		NewproductComponent,
		CategoriesComponent,
		NewcategoryComponent,
		UpdcategoryComponent,
		UpdproductComponent,
		NewuserComponent,
		PromotionsComponent,
		NewpromotionsComponent,
		UpdatepromotionsComponent,
		SalesComponent,
		UdpsaleComponent

	],
	imports: [
		CommonModule,
		NgSelectModule,
		AdminRoutesModule,
		FormsModule,
		NgFloatingActionMenuModule,
		ReactiveFormsModule,
		NgxDropzoneModule

	]
})
export class AdminModule { }