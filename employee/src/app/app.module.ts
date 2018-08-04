import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { EmployeeloginComponent } from './components/employeelogin/employeelogin.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeehomeComponent } from './components/employeehome/employeehome.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

const appRoutes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'admin', component:AdminloginComponent},
  {path:'adminHome',component:AdminHomeComponent},
  {path:'editEmployee',component:EmployeeEditComponent},
  {path:'employee', component:EmployeeloginComponent},
  {path:'employeeHome',component:EmployeehomeComponent},
  {path:'newEmployee',component:NewEmployeeComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AdminloginComponent,
    EmployeeloginComponent,
    AdminHomeComponent,
    NewEmployeeComponent,
    PageNotFoundComponent,
    EmployeehomeComponent,
    EmployeeEditComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
