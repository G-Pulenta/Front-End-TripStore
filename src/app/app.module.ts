import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/user/login/login.component';
import { NewTripComponent } from './components/user/trips/new-trip/new-trip.component';
import { ViewTripsComponent } from "./components/user/trips/view-trips/view-trips.component";
import { EditloginComponent } from './components/user/editlogin/editlogin.component';

// Import Shared/Material.Module.ts
import { MaterialModule } from 'src/shared/material.module';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from './components/user/register/register.component';
import { ToolbarComponent } from './components/user/toolbar/toolbar.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ToolbarComponent,
    EditloginComponent
    NewTripComponent,
    DialogComponent,
    ViewTripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
