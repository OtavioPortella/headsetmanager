import { useQuery } from "@tanstack/react-query";
import { http } from "../services/http";
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
  const { data: filialData, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await http.get("/dashboard");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azul-toledo" />
      </div>
    );
  }

  const chartData = {
    labels: filialData.map((f) => f.nome),
    datasets: [
      {
        label: "Estoque Simples",
        data: filialData.map((f) => f.estoqueSimples),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Estoque Duplo",
        data: filialData.map((f) => f.estoqueDuplo),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl p-6">
      <div className="grid grid-cols-3 gap-6">
        {filialData.map((filial) => (
          <div key={filial.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-azul-toledo mb-4">
              {filial.nome}
            </h2>

            <div className="space-y-2">
              <p className="text-gray-600">
                Estoque Simples:{" "}
                <span className="font-bold">{filial.estoqueSimples}</span>
              </p>
              <p className="text-gray-600">
                Estoque Duplo:{" "}
                <span className="font-bold">{filial.estoqueDuplo}</span>
              </p>
              <p className="text-gray-600">
                Pedidos Pendentes:{" "}
                <span className="font-bold">{filial.pedidosPendentes}</span>
              </p>
              <p className="text-gray-600">
                Total de Pedidos:{" "}
                <span className="font-bold">{filial.totalPedidos}</span>
              </p>
              {filial.novosPedidos > 0 && (
                <p className="text-green-500 font-bold mt-2">
                  {filial.novosPedidos} Pedidos novos!
                </p>
              )}
              {filial.pedidosPendentes > 0 && (
                <p className="text-red-500 font-bold mt-2">
                  {filial.pedidosPendentes} Pedidos aguardando estoque!
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
          <UserRequestsChart filialData={filialData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
