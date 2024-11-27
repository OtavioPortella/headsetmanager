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

export function UserRequestsChart({ filialData }) {
  const chartData = {
    labels: filialData.map((filial) => filial.nome),
    datasets: [
      {
        label: "Quantidade de Pedidos",
        data: filialData.map((filial) => filial.totalPedidos),
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
      <h2 className="text-xl font-bold text-azul-toledo mb-4">
        Quantidade de pedidos por filial
      </h2>
      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
