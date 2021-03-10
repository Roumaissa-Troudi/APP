import { Component, Input, OnChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { HealthStatus } from 'src/app/shared/healthstatus.service';

export interface PeriodicElement {
  healthValuePhy: number,
  healthValuePsy: number,
  date: Date
}

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss']
})
export class ValueTableComponent implements OnChanges {
  @Input() reload: boolean;
  dataSource: PeriodicElement[] ;
  constructor(public healthService: HealthStatus, private route: Router) { }

  ngOnChanges(): void {
     this.healthService.getHealthHistory().subscribe((res) => {

      this.dataSource = res['healthHistory'];
      console.log(this.dataSource);

    },
    (err) => {})  ;

  }
  displayedColumns: string[] = [ 'Health Value Phy',  'Health Value Psy', 'Date'];




}
