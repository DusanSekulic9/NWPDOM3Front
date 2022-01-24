import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./auth-guard.service";
import {requestInterceptor} from "./request-interceptor";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HeaderComponent } from './header/header.component';
import { MachinesComponent } from './machines/machines.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ErrorsComponent } from './errors/errors.component';
import { NewMachineComponent } from './new-machine/new-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    EditUserComponent,
    HeaderComponent,
    MachinesComponent,
    ScheduleComponent,
    ErrorsComponent,
    NewMachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: requestInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
