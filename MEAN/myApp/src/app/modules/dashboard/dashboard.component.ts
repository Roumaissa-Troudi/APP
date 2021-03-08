import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../shared/employee.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  check;
  constructor(public employeeservice: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.check=this.employeeservice.getEmployeeInfo();

  }

}
