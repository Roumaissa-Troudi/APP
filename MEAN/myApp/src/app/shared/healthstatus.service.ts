import { healthstatus } from './healthstatus.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class HealthStatus {
  health_status: healthstatus = {
    healthvalue:0,
  };
  constructor(private http: HttpClient) {}

  postHealth(health_status: healthstatus) {
    return this.http.post(environment.apiBaseUrl + '/health', health_status);
  }
}
