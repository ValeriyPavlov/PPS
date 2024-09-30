import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../interfaces/encuesta';
import { EncuestasService } from '../services/encuestas.service';
import { ECharts, EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';

@Component({
  selector: 'app-graph-encuestas',
  templateUrl: './graph-encuestas.page.html',
  styleUrls: ['./graph-encuestas.page.scss'],
})
export class GraphEncuestasPage implements OnInit {

  chartInstance!: ECharts;
  options!: EChartsOption;

  ////////////////////////////////////////////////////////////////////
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
        // Axis indicator, coordinate trigger effective
        type: 'line', // The default is a straight line： 'line' | 'shadow'
        lineStyle: {
          // Straight line indicator style settings
          color: '#00aecd',
          type: 'dashed',
        },
        crossStyle: {
          color: '#00aecd',
        },
        shadowStyle: {
          // Shadow indicator style settings
          color: 'rgba(200,200,200,0.3)',
        },
      },
    },

    // Area scaling controller
    dataZoom: {
      dataBackgroundColor: '#eee', // Data background color
      fillerColor: 'rgba(144,197,237,0.2)', // Fill the color
      handleColor: '#00aecd', // Handle color
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


  //////////////////////////

  initOptsFeas = {
    renderer: 'svg',
    width: 300,
    height: 300,
  };

  optionsFeas!: EChartsOption;



  theme!: string | ThemeOption;

  optionsLindas!: EChartsOption;


  public showReco: boolean = false;
  public showCali: boolean = false;
  public showVol: boolean = false;
  public showDes: boolean = false;


  public encuestas: Encuesta[] = [];
  public xF: any[] = [];
  public xL: any[] = [];

  constructor(private encuestasServices: EncuestasService) {

  }

  ///////////////////////////////////////////////

  optionsLinea!: EChartsOption;

  mergeOptions!: EChartsOption;


  onChartInit(e: ECharts) {
    this.chartInstance = e;
    console.log('on chart init:', e);
  }

  ngOnInit(): void {
    this.encuestas = [];
    this.encuestasServices.getAll()
      .subscribe(e => {
        this.encuestas = e;
        const xF: any[] = [];
        const yF: any[] = [];
        const series: any = [];

        if (this.encuestas.length > 0) {
          this.xF.push(0, 1, 2, 3, 4, 5);
          this.xF.forEach(x => { series.push({ value: this.contabilizarCalificaciones(x), name: x }) });
          this.optionsLinea = {
            // title: {
            //   left: '50%',
            //   text: 'Volverian',
            //   textAlign: 'center',
            // },
            legend: {
              show: false
            },
            color: ['#1ab5db', '#DB3349'],
            tooltip: {
              confine: true,
              trigger: 'item',
              formatter: '<div>{c}</div>',
              axisPointer: {
                type: 'shadow',
              },
            },

            dataset: {
              // Provide a set of data.
              source: [
                ['product', 'SI', 'NO'],
                ['SI', this.contabilizarVolveria('si')],
                ['NO', this.contabilizarVolveria('no')],
              ],
            },
            // Declare an x-axis (category axis).
            // The category map the first column in the dataset by default.
            xAxis: {},
            // Declare a y-axis (value axis).
            yAxis: { type: 'category' },
            // Declare several 'bar' series,
            // every series will auto-map to each column by default.
            series: [{ type: 'bar' }],
          };


        }


        // this.options = {
        //   tooltip: {
        //     trigger: 'item',
        //     formatter: '{b} : {c} ({d}%)',
        //   },
        //   visualMap: {
        //     show: false,
        //     min: 80,
        //     max: 600,
        //     inRange: {
        //       colorLightness: [0, 1],
        //     },
        //   },
        //   series: [
        //     {
        //       name: 'Destacados',
        //       type: 'pie',
        //       radius: '55%',
        //       center: ['50%', '50%'],
        //       data: [
        //         { value: this.contabilizarDestacados('comida'), name: 'Comida' },
        //         { value: this.contabilizarDestacados('bebidas'), name: 'Bebidas' },
        //         { value: this.contabilizarDestacados('ambiente'), name: 'Ambiente' },
        //         { value: this.contabilizarDestacados('servicio'), name: 'Servicio' },
        //       ].sort((a, b) => a.value - b.value),
        //       roseType: 'radius',
        //       label: {
        //         color: 'rgba(0, 0, 0, .9)',
        //       },
        //       labelLine: {
        //         lineStyle: {
        //           color: 'rgba(0, 0, 0, 0.5)',
        //         },
        //         smooth: 0.2,
        //         length: 10,
        //         length2: 20,
        //       },
        //       itemStyle: {
        //         color: '#B3B7F2',
        //         shadowBlur: 200,
        //         shadowColor: 'rgba(0, 0, 0, 0.5)',
        //       },
        //       animationType: 'scale',
        //       animationEasing: 'elasticOut',
        //       animationDelay: () => Math.random() * 200,
        //     },
        //   ],
        // };

        this.options = {
          // backgroundColor: '#2c343c',
          // title: {
          //   text: 'Customized Pie',
          //   left: 'center',
          //   top: 20,
          //   textStyle: {
          //     color: '#ccc',
          //   },
          // },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {d}%',
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1],
            },
          },
          series: [
            {
              name: 'Counters',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                { value: this.contabilizarDestacados('comida') * 100, name: 'Comida' },
                { value: this.contabilizarDestacados('bebidas') * 100, name: 'Bebidas' },
                { value: this.contabilizarDestacados('ambiente') * 100, name: 'Ambiente' },
                { value: this.contabilizarDestacados('servicio') * 100, name: 'Servicio' },
                // { value: 335, name: 'C-1' },
                // { value: 310, name: 'C-2' },
                // { value: 274, name: 'C-3' },
                // { value: 235, name: 'C-4' },
                // { value: 400, name: 'C-5' },
              ].sort((a, b) => a.value - b.value),
              roseType: 'radius',
              label: {
                color: 'rgba(0, 0, 0, 0.8)',
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(0, 0, 0, 0.8)',
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: () => Math.random() * 200,
            },
          ],
        };

        this.optionsFeas = {
          // title: {
          //   left: '50%',
          //   text: 'Calificaciones',
          //   textAlign: 'center',
          // },
          color: ['#1ab5db'],
          tooltip: {
            confine: true,
            trigger: 'item',
            formatter: '<div> Calificacion {b} ({c} votos)</div>',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['0', '1', '2', '3', '4', '5'],
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
              name: 'Calificaciones',
              type: 'bar',
              barWidth: '60%',
              data: series,
            },
          ],
        };



        const yL: any = [];
        const seriesLindas: any = [];
        this.xL.push('Poco Probable', 'Probable', 'Muy Probable')
        yL.push(this.contabilizarRecomendaciones('poco probable'), this.contabilizarRecomendaciones('probable'), this.contabilizarRecomendaciones('muy probable'));
        this.xL.forEach(r => {
          seriesLindas.push(
            { value: this.contabilizarRecomendaciones(r.toLowerCase()), name: r, label: { show: true }, labelLine: { show: true } }
          );
          this.optionsLindas = {
            // title: {
            //   left: '50%',
            //   text: 'Recomendaciones',
            //   // subtext: 'Mocking Data',
            //   textAlign: 'center',
            // },
            tooltip: {
              confine: true,
              trigger: 'item',
              formatter: '<div> {b}: {c}</div>',
            },
            calculable: true,
            series: [
              {
                name: 'Recomendaciones',
                type: 'pie',
                radius: [20, 90],
                roseType: 'radius',
                data: seriesLindas,
              },
            ],
          };
        });
      });
  }


  contabilizarRecomendaciones(reco: string) {
    return this.encuestas.filter(v => v.recomendacion === reco).length;
  }

  contabilizarCalificaciones(cali: number) {
    return this.encuestas.filter(v => v.clasificacion === cali).length;
  }

  contabilizarVolveria(vol: string) {
    return this.encuestas.filter(v => v.volveria === vol).length;
  }

  contabilizarDestacados(des: string) {
    return this.encuestas.filter(v => v.destacados.includes(des)).length;
  }

  switchCali() {
    this.showCali = !this.showCali;
  }
  switchReco() {
    this.showReco = !this.showReco;
  }
  switchDes() {
    this.showDes = !this.showDes;
  }
  switchVol() {
    this.showVol = !this.showVol;
  }

}
