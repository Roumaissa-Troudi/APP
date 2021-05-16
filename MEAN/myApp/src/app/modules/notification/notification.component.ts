import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notif;
  msg;
  constructor(
    public employeeService: EmployeeService,
    private route: Router,
    protected alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.employeeService.getNotification().subscribe((res) => {
      this.notif = res['notification'];
      this.msg = this.notif;
      if (this.notif == '') {
        this.msg = 'no notification found';
      }
    });
  }
}
