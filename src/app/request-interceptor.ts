import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class requestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jwt = localStorage.getItem('jwt');

    const modifiedRequest = req.clone({

      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', jwt || ''),

      body: {...req.body,
      }

    });

    return next.handle(modifiedRequest);

  }

}
