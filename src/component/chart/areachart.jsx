import React from 'react';


import { AREADD } from '../../utils/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const AreaChart = (ele) => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  let labels = [];
  ele.table.forEach((item) => {

    if (labels.includes(item.area)) {

    } else {
      labels.push(item.area);
    }
  })


  const data = {
    labels,
    datasets: [
      {
        label: 'Defect count by Area',
        data: labels.map((area) => {

          let count = 0;
          ele.table.forEach((item) => {

            if (area === item.area) {
              count += 1;
            }
          })

          return count;

        }),
        borderColor: 'rgb(0, 51, 102)',
        backgroundColor: 'rgba(0, 102, 204, 0.5)',

      },

    ],
  };

  let xsize = 0;
  if (labels.length > 6) {
    xsize = 10;
  } else {
    xsize = 12;
  }

  const options = {
    devicePixelRatio: 2.5,
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Defect Count by Area',
      },


    },
    scales: {
      x: {
        ticks: {
          font: {
            size: xsize,
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        }
      }
    },


  };


  return (<div className='px-4 flex justify-center overflow-x-auto w-full h-full'><Bar options={options} data={data} style={{ overflowX: 'scroll' }} /></div>)
}

export default AreaChart;