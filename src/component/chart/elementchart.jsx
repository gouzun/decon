import React from 'react';
import { ELEMENTDD } from '../../utils/theme';
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

const ElementChart = (ele) => {

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
        text: 'Defect Count',
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 9,
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

  let labels = ELEMENTDD;

  const data = {
    labels,
    datasets: [
      {
        label: 'Defect count by Element',
        data: labels.map((element) => {

          let count = 0;
          ele.table.forEach((item) => {

            if (element === item.element) {
              count += 1;
            }
          })

          return count;

        }),
        borderColor: 'rgb(0, 102, 0)',
        backgroundColor: 'rgba(0, 204, 102, 0.5)',
      },

    ],
  };

  return (<div className='px-4 flex justify-center overflow-x-auto w-full h-full'><Bar options={options} data={data} style={{ overflowX: 'scroll' }} /></div>)
}

export default ElementChart;