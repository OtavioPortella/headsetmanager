import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Dados mockados
const mockData = {
  MAT123456: 15,
  MAT789012: 12,
  MAT345678: 10,
  MAT901234: 8,
  MAT567890: 7,
  MAT234567: 6,
  MAT890123: 5,
  MAT456789: 4,
  MAT012345: 3,
  MAT678901: 2,
};

export function UserRequestsChart() {
  const chartData = {
    labels: Object.keys(mockData),
    datasets: [
      {
        label: "Quantidade de Pedidos",
        data: Object.values(mockData),
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Azul do Tailwind
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-azul-toledo">
        Quantidade de pedidos
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
