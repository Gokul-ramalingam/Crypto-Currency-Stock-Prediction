import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public price = [];
  public chart = [];
  public weekReport=[];
  public symbol;
  public name;
  public image;
  public flag=false;
  public time;
  public past=[];
  public show = false;
  public days = ['MON','TUE','WED','THU','FRI','SAT','SUN']

  constructor(private stock:StockService,private router:Router,private routes:ActivatedRoute) { }

  ngOnInit() {

    this.past = this.stock.getPast();
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          { 
            data: this.price,
            borderColor: "rgba(255,255,255,0.3)",
            backgroundColor:"rgba(255,255,255,0.1)",
            fill: false,
            borderDash: [3, 5],
            lineTension:0,
            pointRadius:4,
            pointStyle: 'circle',
            pointBorderColor:'#ffffff',
            pointBangroundColor:'#ffffff',
            borderWidth:3
          },
        ]
      },
      options: {
        responsive:true,
        maintainAspectRatio: false,
        legend: {
          display: false,
      },
        scales: {
          xAxes: [{
            display: true,
            barPercentage:0.4,
             gridLines:
             {
               display:true,
               color:'rgba(255,255,255,0.2)'
             },
             scaleLabel: {
              display: false,
              // labelString: 'DAYS OF TRADE',
              // fontColor:'#ffffff'
            },
            scaleBreaks: {
              autoCalculate: true
            },
            ticks: {
              fontColor: "white",
              fontSize: 14
          }
          }],
          yAxes: [{
            display: true,
            barPercentage:0.5,
            gridLines:
             {
               zeroLineColor: 'rgba(255,255,255,0.2)',
               color:'rgba(255,255,255,0.2)',
               drawBorder:false,
               tickMarkLength: 130
             },
             scaleLabel: {
              display: false,
              // labelString: 'STOCK IN  RS',
              // fontColor:'#ffffff'
            },
            ticks: {
              fontColor: "white",
              fontSize: 14,
              padding:30,
              callback: function(value, index, values) {
                return '$ ' + Intl.NumberFormat().format((value));
            }
          }
          }],
        }
      }
    });
  }

  public func(value)
  {
    this.price = this.stock.getStocks(value);
    this.symbol=this.stock.getSymbol(value);
    this.name=this.stock.getName(value);
    this.image=this.stock.getImage(value);
    this.time=this.stock.getTime(value);
    this.stock.addPast(value);
    this.weekReport=this.stock.getWeekReport(value);
    if(this.price!=null)
    this.flag=true;
    else if(this.price==null)
    this.flag=false;
  }

  public viewPage(id)
  {
     this.router.navigate(['view',id],{relativeTo:this.routes});
  }

}
