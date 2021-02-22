import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from '../../../consts/routes';

import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';

 @Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  @Input() user: Employee;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

constructor(public employeeservice: EmployeeService, private router: Router){}
  public routes: typeof routes = routes;
  public flatlogicEmail: string ;
 ngOnInit() {


  }
  public signOutEmit(): void {
    this.signOut.emit();
  }


}
