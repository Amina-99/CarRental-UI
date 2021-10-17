import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getAnalyticsByMonth() {
    return this.httpClient.get(this.apiUrl + '/api/Analytics/month-income');
  }
}
