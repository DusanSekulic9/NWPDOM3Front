import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean>
    | Promise<boolean>
    | boolean
  {

    if( localStorage.getItem('jwt') !== null ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
