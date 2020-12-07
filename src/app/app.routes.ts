import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginGuard } from './guards/login.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PurchaseOrdersComponent } from './pages/purchase-orders/purchase-orders.component';
import { ShipmentConfirmationComponent } from './pages/shipment-confirmation/shipment-confirmation.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShoppingCartDetailComponent } from './pages/shopping-cart-detail/shopping-cart-detail.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WishListDetailComponent } from './pages/wish-list-detail/wish-list-detail.component';

const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'shop', component: ShopComponent},
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    { path: 'signup', component: SignupComponent},
    { path: 'product-detail/:id', component: ProductdetailComponent },
    { path: 'admin', canActivate:[AuthGuardGuard,AdminGuard],loadChildren:()=> import('./pages/admin/admin.module').then(module=>module.AdminModule) },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard]},
    { path: 'cart', component: ShoppingCartDetailComponent},
    { path: 'wishlist', component: WishListDetailComponent},
    { path: "checkout", component: CheckoutComponent},
    { path: "shipment-order", component: ShipmentConfirmationComponent},
    { path: "purchase-orders", component: PurchaseOrdersComponent}  
]   
 
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRouterModule {}