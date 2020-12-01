import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginGuard } from './guards/login.guard';

import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'shop', component: ShopComponent},
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    { path: 'signup', component: SignupComponent},
    { path: 'product-detail/:id', component: ProductdetailComponent },
    { path: 'admin', canActivate:[AuthGuardGuard,AdminGuard],loadChildren:()=> import('./pages/admin/admin.module').then(module=>module.AdminModule) },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent},
    { path: 'shopping-cart', component: ShoppingCartComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRouterModule {}