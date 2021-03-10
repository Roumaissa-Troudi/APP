import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-button-slide',
  templateUrl: './button-slide.component.html',
  styleUrls: ['./button-slide.component.css']
})
export class ButtonSlideComponent implements OnInit {
 checked: boolean;
  constructor(public employeeService: EmployeeService, private route: Router) { }

  ngOnInit(): void {
    this.checked=this.employeeService.getEmployeeInfo().workstatus;
  }
  @Output() workvalue= new EventEmitter<any>() ;



  changed(){
    this.checked=!this.checked;
    console.log(this.checked);
    this.workvalue.emit(this.checked);
  }


}
