import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { regionalData } from '../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

const RegionalPieChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#6b7280',
        },
      },
      title: {
        display: true,
        text: 'Sales by Region',
        color: '#374151',
        font: {
          size: 16,
        },
      },
    },
  };

  const data = {
    labels: regionalData.labels,
    datasets: [
      {
        ...regionalData.datasets[0],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-96">
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default RegionalPieChart;
