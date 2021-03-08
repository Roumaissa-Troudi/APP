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
  public dataSource = new MatTableDataSource([]);

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
        this.dataSource = res['replacementTable'];
        console.log(this.dataSource);
      },
      (err) => {}
    );
  }

  doFilter(filterValue='') {
        this.dataSource.filter = filterValue.toLowerCase().trim();
    console.log(this.dataSource);
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
