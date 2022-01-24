import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('user') !== null ) {
      let user = JSON.parse(localStorage.getItem('user') || '');
      if(user.can_start_machines || user.can_restart_machines || user.can_stop_machines) {
        return true;
      }else{
        this.router.navigate(['/machines']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

}
