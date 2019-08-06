import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { Chart } from 'chart.js'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public id;
  public stocks;
  public price;
  public chart;
  public days = ['MON','TUE','WED','THU','FRI','SAT','SUN']
  constructor(private stock:StockService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params : ParamMap)=>
    {
     let id = parseInt(params.get('id'))
     this.id = id;
    });
    this.stocks = this.stock.getStockId(this.id);
    this.price = this.stock.getPrice(this.id);

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
               tickMarkLength: 100
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
  back()
  {
    this.router.navigate(['../../'],{relativeTo : this.route})
  }

}
