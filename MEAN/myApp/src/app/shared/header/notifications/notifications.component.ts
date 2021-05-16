import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { routes } from '../../../consts/routes';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  msg;notif;number;
  public routes: typeof routes = routes;

  constructor(public employeeService: EmployeeService, private route: Router) {}
  ngOnInit(): void {
    this.employeeService.getNotification().subscribe((res) => {
      this.notif = res['notification'];
      this.msg = this.notif;
      this.number=1;
      if (this.notif == '') {
        this.msg = 'no notification found';
this.number=0;
      }
    });
  }

}
