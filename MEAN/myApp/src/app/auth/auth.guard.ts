import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { EmployeeService } from "../shared/employee.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private employeeService: EmployeeService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.employeeService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.employeeService.deleteToken();
         return false;
      }
    return true;
  }

}
