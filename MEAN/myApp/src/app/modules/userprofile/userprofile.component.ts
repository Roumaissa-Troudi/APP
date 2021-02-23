import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../shared/employee.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  check;

  constructor(public employeeservice: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.check=this.employeeservice.getEmployeeInfo();
  }

}
