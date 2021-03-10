import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-workstatus',
  templateUrl: './workstatus.component.html',
  styleUrls: ['./workstatus.component.scss'],
})
export class WorkstatusComponent implements OnInit {
  workvalue;
  showMessage: string ;
  checked;

  constructor(public employeeService: EmployeeService, private route: Router) {}

  ngOnInit(): void {

    this.employeeService.getworkvalue().subscribe(
      (res) => {
        this.checked = res['value'];
        console.log(this.checked);
      },
      (err) => {}
    );
  }
  changed() {
    this.checked = !this.checked;
    console.log(this.checked);
    this.workvalue = this.checked;
    console.log(this.workvalue);
    this.employeeService.postWork(this.workvalue).subscribe(
      (res) => {
        console.log(res);
        if (this.workvalue == true) {
          this.showMessage = 'Welcome Home';
        } else {
          this.showMessage = 'See You Soon';
        }
      },
      (err) => {}
    );
  }
}
