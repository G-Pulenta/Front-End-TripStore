import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ProductComponent} from "./components/product/product.component";
import {AuthService} from "./services/auth/auth.service";
import {NewTripComponent} from "./pages/new-trip/new-trip.component";
import {ViewTripsComponent} from "./pages/view-trips/view-trips.component";
import {HomeComponent} from "./pages/home/home.component";
import {OrderDetailComponent} from "./components/order-detail/order-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthService]},
  {path: 'my-profile', component: ProfileComponent, canActivate: [AuthService]},
  {path: 'products', component: ProductComponent, canActivate: [AuthService]},
  {path: 'new-trip', component: NewTripComponent, canActivate: [AuthService]},
  {path: 'view-trips', component: ViewTripsComponent, canActivate: [AuthService]},
  {path: 'order', component: OrderDetailComponent, canActivate: [AuthService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
