import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import {FormControl, Validators} from '@angular/forms';
import { AlertService } from '../alert/alert.service';

interface Worstation {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-workstatus',
  templateUrl: './workstatus.component.html',
  styleUrls: ['./workstatus.component.scss'],
})
export class WorkstatusComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};
  workstationControl = new FormControl('', Validators.required);
  workvalue;
  checked;
check;
firstvalue;
clicked= false;
selected:number;
  constructor(public employeeService: EmployeeService, private route: Router,protected alertService: AlertService) {}
  worstations: Worstation[] = [
    {value:1, viewValue: 1},
    {value:1,viewValue: 2},
    {value:1,viewValue: 3},
    {value:1,viewValue: 4},
    {value:1,viewValue: 5},
    {value:1,viewValue: 6},
    {value:1,viewValue: 7},
    {value:1,viewValue: 8},
    {value:1,viewValue: 9},
    {value:1,viewValue: 10},
    {value:1,viewValue: 11},
    {value:1,viewValue: 12},
    {value:1,viewValue: 13},
    {value:1,viewValue: 14},
    {value:1,viewValue: 15},
  ];
  ngOnInit(): void {

    this.employeeService.getworkvalue().subscribe(
      (res) => {
        this.firstvalue = res['value'];
        console.log(this.firstvalue);
      },
      (err) => {}
    );
  }

  workeed() {
    this.checked=true;
    this.check="true";
    this.workvalue = this.checked;
    console.log(this.workvalue);
  }
  notworkeed() {
    this.checked=false;
    this.check="false";
    this.workvalue = this.checked;
    console.log(this.workvalue);

  }
  changed() {

    if (this.firstvalue !== this.workvalue && this.workvalue) {
    this.employeeService.postWork(this.workvalue).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {}
    );
    this.employeeService.postWorkstation(this.selected).subscribe(
      (res) => {
        console.log(res);
        this.alertService.success('Work status updated', this.options);
        setTimeout(() => this.route.navigateByUrl('/dashboard/dashboard'),3000);
      },
      (err) => {}
    );
    } else if ( this.firstvalue !== this.workvalue && this.workvalue ==false )
    {
      this.employeeService.postWork(this.workvalue).subscribe(
        (res) => {
          console.log(res);
          this.alertService.success('You are at home!', this.options);
        setTimeout(() => this.route.navigateByUrl('/dashboard/dashboard'),3000);
        },
        (err) => {}
      );
    }
    else if ( this.firstvalue == this.workvalue && this.workvalue ==true )
    {
      this.employeeService.postWorkstation(this.selected).subscribe(
        (res) => {
          console.log(res);
          this.alertService.success('Workstation updated', this.options);
          setTimeout(() => this.route.navigateByUrl('/dashboard/dashboard'),3000);
        },
        (err) => {}
      );
    } else if ( this.firstvalue == this.workvalue && this.workvalue ==false) {
      this.alertService.success('Still at home!', this.options);
      setTimeout(() => this.route.navigateByUrl('/dashboard/dashboard'),3000);

    }
  }
}
