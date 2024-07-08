import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function PopularCarsChart({ dashboardData }) {
  const data = {
    labels: dashboardData?.yearlyPopularCar.map((item) => item.car),
    datasets: [
      {
        data: dashboardData?.yearlyPopularCar.map((item) => item.count),

        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgb(214, 239, 216)',
          'rgb(177, 175, 255)',
          'rgba(150, 201, 244,0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgb(214, 239, 216)',
          'rgb(177, 175, 255)',
          'rgba(150, 201, 244,0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const data = tooltipItem.dataset.data;
            const currentValue = data[tooltipItem.dataIndex];
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className="p-2 bg-white rounded-md shadow-md h-full">
      <h1 className="text-center">{`Popular Cars (${new Date().getFullYear()})`}</h1>
      <div style={{ height: '500px' }} className="flex items-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
