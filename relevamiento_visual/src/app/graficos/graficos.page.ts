import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { Foto } from '../entities/Foto';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit, OnDestroy {

  coolTheme = {
    color: [
      '#b21ab4',
      '#6f0099',
      '#2a2073',
      '#0b5ea8',
      '#17aecc',
      '#b3b3ff',
      '#eb99ff',
      '#fae6ff',
      '#e6f2ff',
      '#eeeeee',
    ],

    title: {
      fontWeight: 'normal',
      color: '#00aecd',
    },

    visualMap: {
      color: ['#00aecd', '#a2d4e6'],
    },

    toolbox: {
      color: ['#00aecd', '#00aecd', '#00aecd', '#00aecd'],
    },

    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#00aecd',
          type: 'dashed',
        },
        crossStyle: {
          color: '#00aecd',
        },
        shadowStyle: {
          color: 'rgba(200,200,200,0.3)',
        },
      },
    },

    dataZoom: {
      dataBackgroundColor: '#eee',
      fillerColor: 'rgba(144,197,237,0.2)',
      handleColor: '#00aecd',
    },

    timeline: {
      lineStyle: {
        color: '#00aecd',
      },
      controlStyle: {
        color: '#00aecd',
        borderColor: '00aecd',
      },
    },

    candlestick: {
      itemStyle: {
        color: '#00aecd',
        color0: '#a2d4e6',
      },
      lineStyle: {
        width: 1,
        color: '#00aecd',
        color0: '#a2d4e6',
      },
      areaStyle: {
        color: '#b21ab4',
        color0: '#0b5ea8',
      },
    },

    chord: {
      padding: 4,
      itemStyle: {
        color: '#b21ab4',
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.5)',
      },
      lineStyle: {
        color: 'rgba(128, 128, 128, 0.5)',
      },
      areaStyle: {
        color: '#0b5ea8',
      },
    },

    graph: {
      itemStyle: {
        color: '#b21ab4',
      },
      linkStyle: {
        color: '#2a2073',
      },
    },

    map: {
      itemStyle: {
        color: '#c12e34',
      },
      areaStyle: {
        color: '#ddd',
      },
      label: {
        color: '#c12e34',
      },
    },

    gauge: {
      axisLine: {
        lineStyle: {
          color: [
            [0.2, '#dddddd'],
            [0.8, '#00aecd'],
            [1, '#f5ccff'],
          ],
          width: 8,
        },
      },
    },
  };


  initOptsFeas = {
    renderer: 'svg',
    width: 372,
    height: 300,
  };

  optionsFeas!: EChartsOption;

  public fotosLindas: Foto[] = [];
  public fotosFeas: Foto[] = [];

  public parsedLindas: any[] = [];
  public parsedFeas: any[] = [];

  theme!: string | ThemeOption;

  optionsLindas!: EChartsOption;
  public ref: any;
  public ref2: any;

  constructor(public location: Location, public userService: UserService) { }

  ngOnInit() {
    this.ref = this.userService.traer("linda").subscribe(data => {
      this.fotosLindas = data;
      this.fotosLindas.forEach(foto => {
        if(foto.votes.length > 0){
          this.parsedLindas.push({value: foto.votes.length, name: foto.url, label: {show: true}, labelLine: {show: false}});
        }
      });
      this.optionsLindas = {
        title: {
          left: '50%',
          text: 'Cosas lindas',
          textAlign: 'center',
        },
        tooltip: {
          confine: true,
          trigger: 'item',
          formatter: '<div style="width: 10rem;"> {a}: {c} ({d}%) <br> <img src="{b}" alt="foto"></div>',
        },
        calculable: true,
        series: [
          {
            name: 'Votos',
            type: 'pie',
            radius: ['10%', '60%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            top: 15,
            label: {show: true, position: 'inside', formatter: '{a}: {c}'},
            data: this.parsedLindas,
          },
        ],
      };
      console.log(this.fotosLindas);
      console.log(this.parsedLindas);
    });
    this.ref2 = this.userService.traer('fea').subscribe(data => {
      this.fotosFeas = data;
      this.fotosFeas.forEach(foto => {
        if(foto.votes.length > 0){
          this.parsedFeas.push({value: foto.votes.length, name: foto.url});
        }
      });
      this.optionsFeas = {
        title: {
          left: '50%',
          text: 'Cosas feas',
          textAlign: 'center',
        },
        color: ['#e8aa9e'],
        tooltip: {
          confine: true,
          trigger: 'item',
          formatter: '<div style="width: 10rem;"> {a}: {c} <br>  <img src="{b}" alt="foto"></div>',
        },
        grid: {
          left: '20%',
          right: '20%',
          bottom: '2%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.parsedFeas,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'Votos',
            type: 'bar',
            barWidth: '30%',
            data: this.parsedFeas,
          },
        ],
      };

    });
  }

  ngOnDestroy(): void {
    this.ref.unsubscribe();
    this.ref2.unsubscribe();
  }


  ionViewWillEnter(){

  }

  volver(){
    this.location.back();
  }
}
