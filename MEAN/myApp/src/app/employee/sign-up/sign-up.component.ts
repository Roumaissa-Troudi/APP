import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
showSuccessMessage: boolean;
serverErrorMessages: string;
emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public employeeService: EmployeeService, private route: Router) { }

  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.employeeService.postEmployee(form.value).subscribe(
      res => {
        this.showSuccessMessage=true;
        setTimeout(() => this.showSuccessMessage= false,4000);
        this.resetForm(form);
       // this.route.navigate('./')
       setTimeout(() => this.route.navigateByUrl('/login'),1000);

      },
      err => {
        if (err.status == 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
        this.serverErrorMessages = 'Something went wrong.'
      }
    );
  }

  resetForm ( form: NgForm) {
    this.employeeService.selectedEmployee = {
      fullName:'',
      email:'',
      password:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
