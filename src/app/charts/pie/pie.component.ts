import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() pieChartLabels: Label[];
  @Input() pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [{
    backgroundColor: ['yellow', 'blue', 'green', 'pink', 'purple', 'brown'],
    borderColor: ['yellow', 'blue', 'green', 'pink', 'purple', 'brown']
  }];

  constructor() { }

  ngOnInit() {
  }

}
