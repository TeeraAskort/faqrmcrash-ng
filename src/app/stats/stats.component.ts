import { RestService } from 'src/app/services/rest/rest.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  ChartConfiguration,
} from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
})
export class StatsComponent implements OnInit {
  @ViewChild('chart', { static: false }) canvas?: ElementRef;

  constructor(private restService: RestService) {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle
    );

    this.restService.fetchStats().subscribe((data) => {
      if (data) {
        const config: ChartConfiguration = {
          type: 'line',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };

        if (this.canvas) {
          new Chart(this.canvas.nativeElement, config);
        }
      }
    });
  }

  ngOnInit(): void {}
}
