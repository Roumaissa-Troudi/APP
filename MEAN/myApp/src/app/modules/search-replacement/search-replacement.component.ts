import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../alert/alert.service';
export interface PeriodicElement {
  fullName: string;
  mail: string;
  workstatus: boolean;
}
@Component({
  selector: 'app-search-replacement',
  templateUrl: './search-replacement.component.html',
  styleUrls: ['./search-replacement.component.scss'],
})
export class SearchReplacementComponent implements OnInit {
  replacementDetails;
  test;clicked= false;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};
   dataSource : MatTableDataSource<PeriodicElement>;
   serverErrorMessages;
  displayedColumns: string[] = [
    'fullName',
    'mail',
    'workstatus',
    'replacement',
  ];
  userDetails;check;
  constructor(public employeeService: EmployeeService, private route: Router, protected alertService: AlertService) {}

  ngOnInit(): void {

        this.check=this.employeeService.getEmployeeInfo();
        console.log(this.check.fullName);


    this.employeeService.getEmployeeTable().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res['replacementTable']);
        console.log(this.dataSource);
      },
      (err) => {}
    );

  }

  doFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onSubmit() {
    this.employeeService.searchReplacement().subscribe(
      (res) => {
        this.replacementDetails = res['replacement'];
        console.log(res);
        this.test = Object.keys(this.replacementDetails).includes('fullName');
      },
      (err) => {     this.alertService.error(err.error.message, this.options);
         console.log(err.error.message);  this.serverErrorMessages = err.error.message;
      }
    );
  }

  submit(element:PeriodicElement) {
  this.employeeService.postNotification(element.mail,this.check.fullName).subscribe(
    (res) => {
      console.log(res);
      this.alertService.success("You have chosen "+element.fullName, this.options);
       setTimeout(() => this.route.navigateByUrl('/dashboard/dashboard'),4000);
    },
    (err) => {}
  );

  }
}
