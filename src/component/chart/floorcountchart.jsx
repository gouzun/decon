import React from 'react';


import { FLOORDD } from '../../utils/theme';
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

const FloorCountChart = (ele) => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

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
        text: 'Defect Count by Floor',
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
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
    }

  };

  let labels = FLOORDD;

  const data = {
    labels,
    datasets: [
      {
        label: 'Defect count by Floor',
        data: labels.map((flr) => {

          let count = 0;
          ele.table.forEach((item) => {

            if (flr === item.floor) {
              count += 1;
            }
          })

          return count;

        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };

  return (<div className='px-4 flex justify-center overflow-x-auto w-full h-full'><Bar options={options} data={data} style={{ overflowX: 'scroll' }} /></div>)
}

export default FloorCountChart;