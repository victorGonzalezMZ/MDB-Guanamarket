import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    { path: 'signup', component: SignupComponent},
    { path: 'product-detail/:id', component: ProductdetailComponent },
    { path: 'admin', loadChildren:()=> import('./pages/admin/admin.module').then(module=>module.AdminModule) },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRouterModule {}