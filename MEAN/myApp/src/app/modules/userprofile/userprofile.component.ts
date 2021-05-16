import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../../shared/employee.service';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};
  check;
  userDetails;
  constructor(public employeeservice: EmployeeService, private router: Router, protected alertService: AlertService) { }

  ngOnInit(): void {
    this.employeeservice.getEmployeeProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
        this.employeeservice.setEmployeeInfo(this.userDetails);
        this.check=this.employeeservice.getEmployeeInfo();
        console.log(this.check);
      },
      (err) => {}
    );
    console.log(this.check);
  }
  ngSubmit(profileForm: NgForm) {
    this.employeeservice.postprofileInfo(profileForm.value).subscribe(
      res => {
        console.log(res);
        this.alertService.success('Profile updated', this.options);
        setTimeout(() => this.router.navigateByUrl('/dashboard/dashboard'),4000);

      },
      err => {
      }
    );
    }


}
