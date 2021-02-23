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
import {MatTabsModule} from '@angular/material/tabs';
import { SearchReplacementComponent } from '../modules/search-replacement/search-replacement.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { UserprofileComponent } from '../modules/userprofile/userprofile.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [DefaultComponent, DashboardComponent, HealthStatusComponent,WorkstatusComponent,UserprofileComponent,SearchReplacementComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,MatTabsModule,
    MatDividerModule,MatCardModule,MatInputModule,
    MatFormFieldModule

  ],
  exports: [],
})
export class DefaultModule {}
