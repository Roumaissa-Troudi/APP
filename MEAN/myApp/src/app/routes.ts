import { PreloadAllModules, Routes } from '@angular/router';
import { from } from 'rxjs';
import { EmployeeComponent } from './employee/employee.component';
import { SignUpComponent } from './employee/sign-up/sign-up.component';
import { SignInComponent } from './employee/sign-in/sign-in.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HealthStatusComponent } from './modules/health-status/health-status.component';
import { NotificationModule } from './modules/notification/notification.module';
import { DefaultComponent } from './default/default.component';
import { TablesComponent } from './modules/tables/tables.component';
import { UserprofileComponent } from './modules/userprofile/userprofile.component';
import { WorkstatusComponent } from './modules/workstatus/workstatus.component';
export const appRoutes: Routes = [
  {
    path: 'signup',
    component: EmployeeComponent,
    children: [{ path: '', component: SignUpComponent }],
  },
  {
    path: 'login',
    component: EmployeeComponent,
    children: [{ path: '', component: SignInComponent }],
  },
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'healthstatus', component: HealthStatusComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'userprofile', component:UserprofileComponent},
      { path: 'workstatus', component:WorkstatusComponent},

    ],
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
