import { useState } from "react";
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
import { UserRequestsChart } from "../components/dashboard/UserRequestChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard() {
  // Mock data
  const [filialData] = useState([
    {
      id: 1,
      name: "Filial SP",
      estoque: {
        simples: 45,
        duplo: 32,
      },
      pendingOrders: 3,
      totalOrders: 127,
      hasAwaitingOrder: true,
    },
    {
      id: 2,
      name: "Filial RJ",
      estoque: {
        simples: 23,
        duplo: 41,
      },
      pendingOrders: 1,
      totalOrders: 98,
      hasAwaitingOrder: false,
    },
    {
      id: 3,
      name: "Filial MG",
      estoque: {
        simples: 56,
        duplo: 28,
      },
      pendingOrders: 5,
      totalOrders: 145,
      hasAwaitingOrder: true,
    },
  ]);

  const chartData = {
    labels: filialData.map((f) => f.name),
    datasets: [
      {
        label: "Estoque Simples",
        data: filialData.map((f) => f.estoque.simples),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Estoque Duplo",
        data: filialData.map((f) => f.estoque.duplo),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl p-6">
      <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
        Relatórios
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {filialData.map((filial) => (
          <div key={filial.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-azul-toledo mb-4">
              {filial.name}
            </h2>

            <div className="space-y-2">
              <p className="text-gray-600">
                Estoque Simples:{" "}
                <span className="font-bold">{filial.estoque.simples}</span>
              </p>
              <p className="text-gray-600">
                Estoque Duplo:{" "}
                <span className="font-bold">{filial.estoque.duplo}</span>
              </p>
              <p className="text-gray-600">
                Pedidos Pendentes:{" "}
                <span className="font-bold">{filial.pendingOrders}</span>
              </p>
              <p className="text-gray-600">
                Total de Pedidos:{" "}
                <span className="font-bold">{filial.totalOrders}</span>
              </p>
              {filial.hasAwaitingOrder && (
                <p className="text-red-500 font-bold mt-2">
                  Pedido aguardando início!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold text-azul-toledo mb-4">
            Comparativo de Estoque
          </h2>
          <div className="h-[300px]">
            <Bar data={chartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <UserRequestsChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
