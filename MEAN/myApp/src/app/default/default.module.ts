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
import { MatTableModule } from '@angular/material/table';
import { TablesComponent } from '../modules/tables/tables.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '../modules/alert/alert.module';
import { NotificationComponent } from '../modules/notification/notification.component';

@NgModule({
  declarations: [DefaultComponent, TablesComponent,NotificationComponent, DashboardComponent, HealthStatusComponent,WorkstatusComponent,UserprofileComponent,SearchReplacementComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    RouterModule,MatSelectModule,
    FlexLayoutModule,AlertModule,
    MatToolbarModule,FormsModule,
    MatButtonModule,MatTabsModule,
    MatDividerModule,MatCardModule,MatInputModule,MatButtonToggleModule,
    MatFormFieldModule,MatTableModule,
    MatSlideToggleModule,MatPaginatorModule,MatSortModule,ChartsModule,MatIconModule,

  ],
  exports: [MatFormFieldModule,
    MatInputModule],
})
export class DefaultModule {}
