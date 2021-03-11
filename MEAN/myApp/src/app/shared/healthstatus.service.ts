import { healthstatus } from './healthstatus.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class HealthStatus {
  health_status: healthstatus = {
    healthvaluePhy: 0,
    healthvaluePsy: 0,
  };
  constructor(private http: HttpClient) {}

  postHealth(healthvaluePhy: number,healthvaluePsy: number ) {
    return this.http.post('/health', {healthvaluePhy,healthvaluePsy});

  }

  getHealthHistory() {
    return this.http.get( '/healtHistory');
  }


}
