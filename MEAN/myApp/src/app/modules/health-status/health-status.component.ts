import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthStatus } from 'src/app/shared/healthstatus.service';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.scss'],
})
export class HealthStatusComponent implements OnInit {
  constructor(public healthService: HealthStatus, private route: Router) {}

  ngOnInit() {}
  healthvalue: number = 0;
  parentreload: boolean= false;
  SethealthValue(event) {
    this.healthvalue = event;
  }
  submit() {
  let value=this.healthvalue;
  this.healthService.postHealth({healthvalue: value}).subscribe(
    res => {
      console.log(res)
      this.parentreload=!this.parentreload;
    },
    err => {
    }
  );



}

}
