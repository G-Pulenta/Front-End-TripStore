import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/user/login/login.component";
import { DashboardComponent } from "./components/user/dashboard/dashboard.component";
import { RegisterComponent } from './components/user/register/register.component';
import { EditloginComponent } from './components/user/editlogin/editlogin.component';
import {NewTripComponent} from "./components/user/trips/new-trip/new-trip.component";
import {ViewTripsComponent} from "./components/user/trips/view-trips/view-trips.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'edit-login', component: EditloginComponent},
  { path: 'new-trip', component: NewTripComponent },
  { path: 'view-trips', component: ViewTripsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
