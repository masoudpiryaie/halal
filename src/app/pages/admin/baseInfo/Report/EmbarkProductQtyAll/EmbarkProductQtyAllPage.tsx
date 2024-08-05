import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, Uploader} from '@core/components'
import {useState, useEffect, useRef} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import axios from 'axios'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSSVariableValue} from '_metronic/assets/ts/_utils'
import {date} from 'yup/lib/locale'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}
export type ChartModel = {
  id: number
  containerNo: string
}

const EmbarkProductQtyAllPage: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [SeriesList, setseriesList] = useState<number[]>([])
  const [CatsList, setcatsList] = useState<string[]>([])
  const chartOptions1 = (chartColor: string, chartHeight: string): ApexOptions => {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const secondaryColor = getCSSVariableValue('--bs-gray-300')
    const baseColor = getCSSVariableValue('--bs-' + chartColor)

    return {
      //series: SeriesList,
      series: [
        {
          name: 'Net Profit',
          data: [50, 60, 70, 80, 60, 50, 70, 60],
        },
        {
          name: 'Revenue',
          data: [50, 60, 70, 80, 60, 50, 70, 60],
        },
      ],
      xaxis: {
        categories: CatsList,
        //categories: ['Fe1111b', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: chartHeight,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: {
        type: 'solid',
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val) {
            return '$' + val + ' revenue'
          },
        },
      },
      colors: [baseColor, secondaryColor],
      grid: {
        padding: {
          top: 10,
        },
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    }
  }
  const chart = new ApexCharts(chartRef.current, chartOptions1('primary', '175px'))
  var dat = null
  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    async function getList() {
      try {
        const to = 'h'
        const from = 'h'
        let url = 'EmbarkProductQtyAll/embarkProductQtyAll/' + from + '/' + to
        var list = await axios.post(url)
        var dat = list.data.data

        for (var i = 0; i < dat.length; i++) {
          setseriesList([...SeriesList, dat[i].pureWeightWithoutCarton])
          setcatsList([...CatsList, dat[i].name]) // to do
        }
        const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
          const labelColor = getCSSVariableValue('--bs-gray-500')
          const borderColor = getCSSVariableValue('--bs-gray-200')
          const secondaryColor = getCSSVariableValue('--bs-gray-300')
          const baseColor = getCSSVariableValue('--bs-' + chartColor)

          return {
            //series: SeriesList,
            series: [
              {
                name: 'Net Profit',
                data: [50, 60, 70, 80, 60, 50, 70, 60],
              },
              // {
              //   name: 'Revenue',
              //   data: [50, 60, 70, 80, 60, 50, 70, 60],
              // },
            ],
            xaxis: {
              categories: CatsList,
              //categories: ['Fe1111b', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                style: {
                  colors: labelColor,
                  fontSize: '12px',
                },
              },
            },
            chart: {
              fontFamily: 'inherit',
              type: 'bar',
              height: chartHeight,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 5,
              },
            },
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent'],
            },
            yaxis: {
              labels: {
                style: {
                  colors: labelColor,
                  fontSize: '12px',
                },
              },
            },
            fill: {
              type: 'solid',
            },
            states: {
              normal: {
                filter: {
                  type: 'none',
                  value: 0,
                },
              },
              hover: {
                filter: {
                  type: 'none',
                  value: 0,
                },
              },
              active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                  type: 'none',
                  value: 0,
                },
              },
            },
            tooltip: {
              style: {
                fontSize: '12px',
              },
              y: {
                formatter: function (val) {
                  return '$' + val + ' revenue'
                },
              },
            },
            colors: [baseColor, secondaryColor],
            grid: {
              padding: {
                top: 10,
              },
              borderColor: borderColor,
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
          }
        }
        const chart = new ApexCharts(chartRef.current, chartOptions('primary', '175px'))
        chart.render()
      } catch (e) {}
    }

    if (chart) {
      getList()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef])

  async function getList11() {
    try {
      const to = 'h'
      const from = 'h'
      let url = 'EmbarkProductQtyAll/embarkProductQtyAll/' + from + '/' + to
      var list = await axios.post(url)
      var dat = list.data.data
      for (var i = 0; i < dat.length; i++) {
        setseriesList([...SeriesList, dat[i].Name])
        setcatsList([...CatsList, dat[i].PureWeightWithoutCarton])
        chart.render()
      }
    } catch (e) {}
  }

  return (
    <>
      <div className={`card ${className}`}>
        <div className='card-body d-flex flex-column p-0'>
          <div className='flex-grow-1 card-p pb-0'>
            <div className='d-flex flex-stack flex-wrap'>
              <div className='me-2'>
                <a href='#' className='text-dark text-hover-primary fw-bolder fs-3'>
                  Generate Reports
                </a>

                <div className='text-muted fs-7 fw-bold'>Finance and accounting reports</div>
              </div>

              <div className={`fw-bolder fs-3 text-${chartColor}`}>$24,500</div>
            </div>
          </div>

          <div ref={chartRef} className='mixed-widget-7-chart card-rounded-bottom'></div>
        </div>
      </div>
    </>
  )
}

export {EmbarkProductQtyAllPage}
