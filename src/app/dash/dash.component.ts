import { CovidDataService } from './../services/covid-data.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {

  private subscribers: Subscription[];
  public statesData;
  public globalToday;
  public continents = {
    labels: [],
    data: []
  };
  public usData = {
    labels: [],
    data: [
      {
        data: [],
        label: 'cases'
      },
      {
        data: [],
        label: 'deaths'
      }
    ]
  };

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private covidDataService: CovidDataService) {
    this.subscribers = [
      // this.getStatesToday(),
      this.getAllContinents(),
      this.getHistoricalData(),
      this.getGlobalToday()
    ];
  }

  getAllContinents() {
    return this.covidDataService.getAllContinents().subscribe({
      next: (data: object[]) => {
        data.map(continent => {
          this.continents.labels.push(continent['continent']);
          this.continents.data.push(continent['active']);
        });
        console.log(this.continents);
      }
    });
  }

  getStatesToday() {
    return this.covidDataService.getStatesToday().subscribe({
      next: data => {
        this.statesData = data;
        console.log(this.statesData);
      }
    });
  }

  getHistoricalData() {
    return this.covidDataService.getHistoricalData('USA', '30').subscribe({
      next: data => {
        const cases: object[] = data['timeline']['cases'];
        const deaths: object[] = data['timeline']['deaths'];
        for (const day in cases) {
          this.usData.labels.push(day);
          this.usData.data[0].data.push(cases[day]);
          this.usData.data[1].data.push(deaths[day]);
        }
        console.log(this.usData);
      }
    });
  }

  getGlobalToday() {
    return this.covidDataService.getGlobalToday().subscribe({
      next: data => {
        this.globalToday = data;
        console.log(data);
      }
    });
  }


  ngOnDestroy(): void {
    this.subscribers.forEach(
      sub => {
        sub.unsubscribe();
      }
    );
  }
}
