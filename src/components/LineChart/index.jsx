import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ chartData }) => {
  const labels = Object.keys(chartData).sort((a, b) => {
    return a - b;
  });
  const data = {
    labels,
    datasets: [
      {
        label: 'Số lượt theo dõi',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(chartData),
      },
    ],
  };
  return (
    <div>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: 'Thống kê số lượt theo dõi theo giá mong muốn.',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
        width="600"
        height="250"
      />
    </div>
  );
};

export default LineChart;
