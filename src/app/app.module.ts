import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from "./pages/login/login.component";

import {FormsModule} from '@angular/forms';

import {MaterialModule} from "./shared/material.module";

import {HttpClientModule} from '@angular/common/http';
import {UserService} from "./services/user/user.service";
import {RegisterComponent} from './pages/register/register.component';
import {NgOptimizedImage} from "@angular/common";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {FooterComponent} from './components/footer/footer.component';
import { NewTripComponent } from './pages/new-trip/new-trip.component';
import { ViewTripsComponent } from './pages/view-trips/view-trips.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CartActionsComponent } from './components/cart-actions/cart-actions.component';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ToolbarComponent,
    ProfileComponent,
    ProductComponent,
    CartComponent,
    FooterComponent,
    NewTripComponent,
    ViewTripsComponent,
    HomeComponent,
    OrderDetailComponent,
    CartActionsComponent,
    CartDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    NgOptimizedImage,
    FlexLayoutModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
