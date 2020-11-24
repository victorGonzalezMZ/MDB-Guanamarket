import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {   
        path: '', 
        component: AdminComponent,
        children:[
            {path: 'main', component: MainComponent},    
            {path: 'users', component: UsersComponent,canActivate: [AuthGuardGuard] }    
        ]
    },
    
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutesModule { }