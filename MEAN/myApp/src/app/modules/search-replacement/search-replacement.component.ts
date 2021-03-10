import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource } from '@angular/material/table';

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
  test;
   dataSource : MatTableDataSource<PeriodicElement>;

  displayedColumns: string[] = [
    'fullName',
    'mail',
    'workstatus',
    'replacement',
  ];

  constructor(public employeeService: EmployeeService, private route: Router) {}

  ngOnInit(): void {
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
      (err) => {}
    );
  }
}
