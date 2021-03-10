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
  healthvaluePhy: number = 0;
  healthvaluePsy: number = 0;
  parentreload: boolean= false;
  SethealthValuePhy(event) {
    console.log(event);
    this.healthvaluePhy = event;

  }
  SethealthValuePsy(event) {
    this.healthvaluePsy = event;
  }
  submit() {
  this.healthService.postHealth(this.healthvaluePhy,this.healthvaluePsy).subscribe(
    res => {
      console.log(res)
      this.parentreload=!this.parentreload;
    },
    err => {
    }
  );
  }





}
