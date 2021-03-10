import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
export interface PeriodicElement {
  fullName: string,
  mail: string,
  workstatus: boolean
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  dataSource: PeriodicElement[] ;
  constructor(public employeeService: EmployeeService, private route: Router) {}

  ngOnInit(): void {
    this.employeeService.gettableEmployee().subscribe(
      (res) => {
        this.dataSource = res['EmployeeTable'];
        console.log(this.dataSource);
      },
      (err) => {}
    );
  }
  displayedColumns: string[] = [ 'fullName', 'mail', 'workstatus'];

}
