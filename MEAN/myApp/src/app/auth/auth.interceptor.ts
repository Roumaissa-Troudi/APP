import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable} from '@angular/core';
import { tap } from 'rxjs/operators';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private employeeService: EmployeeService, private router: Router){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth'))
     return next.handle(req.clone());
    else {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.employeeService.getToken())
      });
      return next.handle(clonedreq).pipe(
        tap(
            event => {},
            err => {
              if (err.error.auth == false)
                 this.router.navigateByUrl('/login');
               }
        )
      );
    }

  }
}
