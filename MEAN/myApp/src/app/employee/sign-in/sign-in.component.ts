import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  userDetails;
  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {}

  model = {
    email: '',
    password: '',
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.employeeService.login(form.value).subscribe(
      (res) => {
        console.log(res);
        this.employeeService.setToken(res['token']);
        this.employeeService.getEmployeeProfile().subscribe(
          (res) => {
            this.userDetails = res['user'];
            this.employeeService.setEmployeeInfo(this.userDetails);
            console.log(this.userDetails);
          },
          (err) => {}
        );

        this.router.navigateByUrl('/dashboard/dashboard');
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
