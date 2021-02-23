import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-search-replacement',
  templateUrl: './search-replacement.component.html',
  styleUrls: ['./search-replacement.component.scss']
})
export class SearchReplacementComponent implements OnInit {
replacementDetails;
test;

  constructor(public employeeService: EmployeeService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.employeeService.searchReplacement().subscribe(
      (res) => {
        this.replacementDetails = res['replacement'];
        console.log(res);
        this.test=Object.keys(this.replacementDetails).includes("fullName");
      },
      (err) => {}
    );

  }


}
