import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth-guard.service";
import {UserComponent} from "./user/user.component";
import {UserGuard} from "./user.guard";
import {UserEditGuard} from "./user-edit.guard";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {MachinesComponent} from "./machines/machines.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {ErrorsComponent} from "./errors/errors.component";
import {MachinesGuardGuard} from "./machines-guard.guard";
import {NewMachineComponent} from "./new-machine/new-machine.component";
import {CreateMachineGuard} from "./create-machine.guard";
import {ScheduleGuard} from "./schedule.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'editUser', component: EditUserComponent,canActivate: [AuthGuard, UserEditGuard] },
  { path: 'createUser', component: UserComponent,canActivate: [AuthGuard, UserGuard] },
  { path: 'machines', component: MachinesComponent,canActivate: [AuthGuard, MachinesGuardGuard] },
  { path: 'errors', component: ErrorsComponent,canActivate: [AuthGuard, MachinesGuardGuard] },
  { path: 'createMachine', component: NewMachineComponent,canActivate: [AuthGuard, CreateMachineGuard] },
  { path: 'schedule', component: ScheduleComponent,canActivate: [AuthGuard, ScheduleGuard] },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}

