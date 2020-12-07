
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './components/navigation/carousel/carousel.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { TopbarComponent } from './components/navigation/topbar/topbar.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { StarRatingModule } from 'angular-rating-star';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { AppRouterModule } from './app.routes';
import { JwtModule } from "@auth0/angular-jwt";
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductFiltersComponent } from './components/products/product-filters/product-filters.component';
import { ShopComponent } from './pages/shop/shop.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule } from '@angular/forms';

import {ScrollingModule} from '@angular/cdk/scrolling'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ShoppingCartDetailComponent } from './pages/shopping-cart-detail/shopping-cart-detail.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { WishListDetailComponent } from './pages/wish-list-detail/wish-list-detail.component';
import { ProductNewComponent } from './components/products/product-new/product-new.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductsRandomComponent } from './components/products/products-random/products-random.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ShipmentConfirmationComponent } from './pages/shipment-confirmation/shipment-confirmation.component';
import { PurchaseOrdersComponent } from './pages/purchase-orders/purchase-orders.component';

import { LightboxModule } from 'ngx-lightbox';


export function tokenGetter() {
	return localStorage.getItem("jwt");
}


@NgModule({
	declarations: [
		AppComponent,
		CarouselComponent,
		FooterComponent,
		TopbarComponent,
		ProductCardComponent,
		HomeComponent,
		LoginComponent,
		NotfoundComponent,
		ProductdetailComponent,
		SidebarComponent,
		SignupComponent,
		ProductFiltersComponent,
		ShopComponent,
		ProfileComponent,
		ShoppingCartComponent,
		ShoppingCartDetailComponent,
		WishListComponent,
		WishListDetailComponent,
		ProductNewComponent,
		ProductsRandomComponent,
		CheckoutComponent,
		ShipmentConfirmationComponent,
		PurchaseOrdersComponent
	],
	imports: [
		BrowserModule,
		RouterModule,
		BrowserAnimationsModule,
		MDBBootstrapModule.forRoot(),
		FormsModule,
		StarRatingModule,
		AppRouterModule,
		HttpClientModule,
		NgxSliderModule,
		ReactiveFormsModule,
		ScrollingModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				allowedDomains: ["api03mtw102.azurewebsites.net"],
				disallowedRoutes: [],
			},
		}),
		NgxDropzoneModule,
		NgSelectModule,
		LightboxModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
