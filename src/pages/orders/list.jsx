import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";
import { ORDER_STATUS } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

function OrdersList() {
  const queryClient = useQueryClient();

  const { user } = useAuth();

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

  const { mutate: changeOrderStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      await http.put(`/pedido/${id}`, {
        status,
      });
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

  function getOrderActions(order) {
    const { status, id } = order;
    switch (status) {
      case ORDER_STATUS.NOVO:
        return [
          {
            label: "Iniciar",
            onClick: () =>
              changeOrderStatus({
                id,
                status: ORDER_STATUS.EM_ATENDIMENTO,
              }),
          },
        ];
      case ORDER_STATUS.PENDENTE:
        return [
          {
            label: "Iniciar",
            onClick: () =>
              changeOrderStatus({
                id,
                status: ORDER_STATUS.EM_ATENDIMENTO,
              }),
          },
        ];
      case ORDER_STATUS.EM_ATENDIMENTO:
        return [
          {
            label: "Finalizar",
            onClick: () =>
              changeOrderStatus({
                id,
                status: ORDER_STATUS.FINALIZADO,
              }),
          },
        ];

      default:
        return [];
    }
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
              <th className="p-2 text-left">Solicitante</th>
              <th className="p-2 text-left">Quantidade Simples</th>
              <th className="p-2 text-left">Motivo</th>
              <th className="p-2 text-left">Matrículas</th>
              <th className="p-2 text-left">Status</th>
              {user?.perfil?.admin && <th className="p-2 text-left">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr className="border-b" key={String(order.id)}>
                <td className="p-2">{order.usuario.nome}</td>
                <td className="p-2">{order.qtdSimples}</td>
                <td className="p-2">{order.motivo.replaceAll("_", " ")}</td>
                <td className="p-2">{order.matriculas.join(", ")}</td>
                <td className="p-2">{order.status.replaceAll("_", " ")}</td>
                {user?.perfil?.admin && (
                  <td className="p-2 flex gap-2">
                    {getOrderActions(order).map((action) => (
                      <Button onClick={action.onClick} key={action.label}>
                        {action.label}
                      </Button>
                    ))}
                    {order.status !== ORDER_STATUS.FINALIZADO && (
                      <Button
                        onClick={() => handleDeleteOrder(order.id)}
                        color="danger"
                      >
                        Cancelar
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default OrdersList;
