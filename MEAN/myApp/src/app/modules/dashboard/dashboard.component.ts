import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HealthStatus } from 'src/app/shared/healthstatus.service';
import { Chart } from 'chart.js';
import { EmployeeService } from '../../shared/employee.service';
import { DatePipe } from '@angular/common';

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
  chart1;
  check;userDetails;
chart2;
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
    this.employeeservice.getEmployeeProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
        this.employeeservice.setEmployeeInfo(this.userDetails);
        this.check=this.employeeservice.getEmployeeInfo();
        console.log(this.check);
      },
      (err) => {}
    );

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
        let phy = res['healthHistory'].map((res) => res.healthValuePhy);
        console.log(phy);

        let psy = res['healthHistory'].map((res) => res.healthValuePsy);
        let date = res['healthHistory'].map((res) => res.date);
        let dates = [];

        date.forEach((res) => {
          dates.push(this.pipe.transform(res, 'shortDate'));
        });
        console.log(dates);
        this.chart1 = new Chart('canvas1', {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                data: phy,
                borderColor: 'white',
                fill: false,
                borderWidth: 5,
              },
            ],
          },
          options: {
            responsive: true ,
            legend: { display: false },


            scales: {
              yAxes: [
                { gridLines: {
                  display: true ,
                  color: 'white'
                },
                  ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 1,
                    fontColor: 'white'
                  },
                },
              ],
              xAxes: [
                { gridLines: {
                  display: true ,
                  color: 'white',


                },
                  ticks: {

                    fontColor: 'white'
                  },
                },
              ]
            },
          },
        });
        this.chart2 = new Chart('canvas2', {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                data: psy,
                borderColor: 'white',
                fill: false,
                borderWidth: 5,
              },
            ],
          },
          options: {
            legend: { display: false },
            responsive: true ,

            scales: {
              yAxes: [
                { gridLines: {
                  display: true ,
                  color: 'white'
                },
                  ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 1,
                    fontColor: 'white'
                  },
                },
              ],
              xAxes: [
                { gridLines: {
                  display: true ,
                  color: 'white',


                },
                  ticks: {

                    fontColor: 'white'
                  },
                },
              ]
            },
          },
        });
      },
      (err) => {}
    );

    console.log('hello');
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
