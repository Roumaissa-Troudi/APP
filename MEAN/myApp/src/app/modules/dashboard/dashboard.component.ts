import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HealthStatus } from 'src/app/shared/healthstatus.service';
import { Chart } from 'chart.js';
import { EmployeeService } from '../../shared/employee.service';
import { DatePipe  } from '@angular/common'

export interface PeriodicElement {
  fullName: string;
  mail: string;
  workstatus: boolean;
}
export interface PeriodicElement2 {
  healthValuePhy: number;
  healthValuePsy: number;
  date: Date;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chart;
  check;
  phy;psy;dates;
  replacementDetails;
  test;
  dataSource: MatTableDataSource<PeriodicElement>;
  dataSource2: PeriodicElement2[];

  displayedColumns: string[] = ['fullName', 'mail', 'workstatus'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  pipe = new DatePipe('en-US');

  constructor(
    public employeeservice: EmployeeService,
    private router: Router,
    public healthService: HealthStatus
  ) {}

  ngOnInit(): void {
    this.check = this.employeeservice.getEmployeeInfo();

    this.employeeservice.getEmployeeTable().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res['replacementTable']);
        console.log(this.dataSource);
      },
      (err) => {}
    );

    this.healthService.getHealthHistory().subscribe(
      (res) => {
        this.dataSource2 = res['healthHistory'];
        console.log(this.dataSource2);
        this.phy= res['healthHistory'].map (res => res.healthValuePhy);

        this.psy= res['healthHistory'].map (res => res.healthValuePsy);
        let date= res['healthHistory'].map (res => res.date);
        this.dates=[]

        date.forEach((res)=> {
          this.dates.push(this.pipe.transform(res,'shortDate'))
        });
        console.log(this.dates);
      },
      (err) => {}
    );
    this.chart = new Chart('canvas',{
      type:'line',
      data: {
        labels: this.dates ,
        datasets: [{
          data: this.phy,
          borderColor: 'red',
          fill:false
        }]
      },
      options: {
        legend: { display: false}

      }

    })
    console.log('hello');
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
}
