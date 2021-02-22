import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-workstatus',
  templateUrl: './workstatus.component.html',
  styleUrls: ['./workstatus.component.css']
})
export class WorkstatusComponent implements OnInit {

  constructor(public employeeService: EmployeeService,  private route: Router) { }

  ngOnInit(): void {
  }
   workvalue: boolean = this.employeeService.getEmployeeInfo().workStatus;

  SetworkValue(event) {

    this.workvalue = !this.workvalue;
console.log(this.workvalue);
    this.employeeService.postWork(this.workvalue).subscribe(
      res => {
        console.log(res)
      },
      err => {
      }
    );

  }

}
