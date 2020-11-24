import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent} from './admin.component';
import { MainComponent} from './main/main.component';
import {AdminRoutesModule} from './admin.routes';
import { UsersComponent } from './users/users.component';

@NgModule({
    declarations: [
        AdminComponent,
        MainComponent,
        UsersComponent,
    ],
    imports: [
      CommonModule,
      AdminRoutesModule
    ]
  })
  export class AdminModule {}