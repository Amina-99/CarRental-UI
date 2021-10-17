import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MonthAnalytics } from 'src/app/models/month-analytics';
import { AnalyticsService } from 'src/app/services/analytics.service';
@Component({
  selector: 'app-income-anaycits',
  templateUrl: './income-anaycits.component.html',
  styleUrls: ['./income-anaycits.component.css'],
})
export class IncomeAnaycitsComponent implements OnInit {
  data = {
    labels: [],
    datasets: [
      {
        label: 'Business',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    Chart.register(...registerables);
    this.analyticsService
      .getAnalyticsByMonth()
      .subscribe((data: MonthAnalytics[]) => {
        data.map((monthData) => {
          this.data.labels.push(monthData.monthName);
          this.data.datasets[0].data.push(monthData.income);
        });
        var ctx = document.getElementById('Chart1') as HTMLCanvasElement;
        var Chart1 = new Chart(ctx, {
          type: 'bar',
          data: this.data,
        });
      });
  }
}
