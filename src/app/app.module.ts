
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
		ShopComponent
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
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				allowedDomains: ["api03mtw102.azurewebsites.net"],
				disallowedRoutes: [],
			},
		}),
		
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
