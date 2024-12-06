import React, { useEffect, useRef, useState } from 'react';
import './Trends.scss';
import * as echarts from 'echarts';

const Trends = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const chickChartRef = useRef(null);
  const [lineChart, setLineChart] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const [chickChart, setChickChart] = useState(null);

  const lineChartOption = {
    title: {
      text: 'Market Trend',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    color: ['#3c4858'],
    grid: {
      left: '5%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['20-01-24', '21-01-24', '22-01-24', '23-01-24', '24-01-24', '25-01-24', '26-1-24'],
      name: 'Date',
      nameLocation: 'middle',
      nameGap: '30'
    },
    yAxis: {
      type: 'value',
      name: 'Rate/Kg',
      nameLocation: 'middle',
      nameGap: 40
    },
    series: [
      {
        data: [83, 98, 98, 110, 118, 123, 118],
        type: 'line',
        markPoint: {
          data: [
            { type: 'max', name: 'Max' }
          ]
        },
      }
    ],
    responsive: true
  };
  const chickTrendOption = {
    title: {
      text: 'Chick Trend',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    color: ['#3c4858'],
    grid: {
      left: '5%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['20-01-24', '21-01-24', '22-01-24', '23-01-24', '24-01-24', '25-01-24', '26-1-24'],
      name: 'Date',
      nameLocation: 'middle',
      nameGap: '30'
    },
    yAxis: {
      type: 'value',
      name: 'Rate/Kg',
      nameLocation: 'middle',
      nameGap: 40
    },
    series: [
      {
        data: [23, 43, 41, 30, 33, 23, 18],
        type: 'line',
        markPoint: {
          data: [
            { type: 'max', name: 'Max' }
          ]
        },
      }
    ],
    responsive: true
  };
  const barChartOption = {
    toolbox: {
      feature: {
        saveAsImage: {
          title: 'Save',
          show: true,
          name: 'Customer Wise Sales'
        }
      }
    },
    color: ['#3c4858'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    title: {
      text: 'Customer Wise Sales',
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          'Vali',
          'Shiva',
          'Bala Krishna',
          'Asunu',
          'Naveen',
          'Sipulla',
          'Venkatramana',
          'Saidu',
          'Charan',
          'DoraSwamy'
        ],
        axisLabel: {
          interval: 0,
          fontSize: 8
        },
        name: 'Total No. of Hens',
        nameLocation: 'middle',
        nameGap: 30
      }
    ],
    yAxis: [
      {
        name: 'Total No. of Hens',
        nameLocation: 'middle',
        nameGap: 40
      }
    ],
    label: {
      position: 'top',
      show: true,
      color: []
    },
    series: [
      {
        name: 'Sales',
        type: 'bar',
        barWidth: '60%',
        data: [40, 40, 60, 120, 20, 100, 20, 50, 550, 400]
      }
    ],
    responsive: true
  };

  const resizeCharts = () => {
    if (lineChart) {
      lineChart.resize();
    }
    if (barChart) {
      barChart.resize();
    }
    if (chickChart) {
      chickChart.resize();
    }
  };

  useEffect(() => {
    if (lineChartRef.current && barChartRef.current && chickChartRef.current) {
      const lineChartInstance = echarts.init(lineChartRef.current);
      const barChartInstance = echarts.init(barChartRef.current);
      const chickChartInstance = echarts.init(chickChartRef.current);
      lineChartInstance.setOption(lineChartOption);
      barChartInstance.setOption(barChartOption);
      chickChartInstance.setOption(chickTrendOption);
      setLineChart(lineChartInstance);
      setBarChart(barChartInstance);
      setChickChart(chickChartInstance);

      window.addEventListener('resize', resizeCharts);

      return () => {
        window.removeEventListener('resize', resizeCharts);
        lineChartInstance.dispose();
        barChartInstance.dispose();
        chickChartInstance.dispose();
      };
    }
  }, []);

  return (
    <div className='pageContainer'>
      <div className='row col-md-12 col-xs-12 py-2 px-0 m-0'>
        <div className='col-md-6 col-xs-12 my-2'>
          <div ref={lineChartRef} className='graphCard' id="lineChart" style={{ height: '275px', maxWidth: '100%' }} />
        </div>
        <div className='col-md-6 col-xs-12 my-2'>
          <div ref={barChartRef} className='graphCard' id="barChart" style={{ height: '275px', maxWidth: '100%' }} />
        </div>
        <div className='col-md-6 col-xs-12 my-2'>
          <div ref={chickChartRef} className='graphCard' id="barChart" style={{ height: '275px', maxWidth: '100%' }} />
        </div>
        {/* <div className='col-md-6 col-xs-12 my-2'>
          <div ref={feedChartRef} className='graphCard' id="barChart" style={{ height: '275px', maxWidth: '700px' }} />
        </div> */}
      </div>
      {/* <button onClick={resizeCharts}>Resize</button> */}
    </div>
  );
};

export default Trends;