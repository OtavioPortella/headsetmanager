import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";

function OrdersList() {
  const queryClient = useQueryClient();

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await http.get("/pedido");
      return response.data;
    },
  });

  const { mutate: deleteOrder } = useMutation({
    mutationFn: async (id) => {
      await http.delete(`/pedido/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  function handleDeleteOrder(id) {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) {
      return;
    }

    deleteOrder(id);
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Title>Pedidos</Title>
        <Link to="/orders/new">
          <Button>Novo Pedido</Button>
        </Link>
      </div>

      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Quantidade Simples</th>
              <th className="p-2 text-left">Motivo</th>
              <th className="p-2 text-left">Matrículas</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr className="border-b" key={String(order.id)}>
                <td className="p-2">{order.qtdSimples}</td>
                <td className="p-2">{order.motivo}</td>
                <td className="p-2">{order.matriculas.join(", ")}</td>
                <td className="p-2 flex gap-2">
                  <Button onClick={() => handleDeleteOrder(order.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default OrdersList;
