import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/user/login/login.component";
import { DashboardComponent } from "./components/user/dashboard/dashboard.component";
import { RegisterComponent } from './components/user/register/register.component';
import { EditloginComponent } from './components/user/editlogin/editlogin.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'editlogin', component: EditloginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
