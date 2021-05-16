import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { SignUpComponent } from './employee/sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { appRoutes } from './routes';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { SignInComponent } from './employee/sign-in/sign-in.component';
import { EmployeeService } from './shared/employee.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DefaultModule } from './default/default.module';
import { HealthStatus } from './shared/healthstatus.service';
import { NotificationComponent } from './modules/notification/notification.component';
import { AlertModule } from './modules/alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SignUpComponent,
    EmployeeProfileComponent,
    SignInComponent,
    NotificationComponent,







        ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    DefaultModule,AlertModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    EmployeeService,
    HealthStatus

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
