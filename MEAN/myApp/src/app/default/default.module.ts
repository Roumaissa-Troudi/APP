import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DefaultComponent } from './default.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HealthStatusComponent } from '../modules/health-status/health-status.component';
import { MatButtonModule } from '@angular/material/button';
import { WorkstatusComponent } from '../modules/workstatus/workstatus.component';

@NgModule({
  declarations: [DefaultComponent, DashboardComponent, HealthStatusComponent,WorkstatusComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [],
})
export class DefaultModule {}
