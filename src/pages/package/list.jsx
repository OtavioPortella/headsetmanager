import { Link, useNavigate } from "react-router-dom";
import { Check, Edit, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";
import { formatDate } from "../../utils/formatters";

function Packages() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await http.get("/malote");
      return response.data;
    },
  });

  const { mutate: deletePackage } = useMutation({
    mutationFn: async (id) => {
      await http.delete(`/malote/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const { mutate: markAsReceived } = useMutation({
    mutationFn: async (id) => {
      await http.put(`/malote/receive/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  function handleDeletePackage(id) {
    if (!confirm("Tem certeza que deseja excluir este malote?")) {
      return;
    }
    deletePackage(id);
  }

  function handleConfirmPackage(id) {
    const answer = prompt("Digite RECEBI para confirmar o recebimento?");
    if (answer !== "RECEBI") {
      return;
    }
    markAsReceived(id);
  }

  const PackageTable = ({ packages, title, isReceivedList = false }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Qtd simples</th>
            <th className="p-2 text-left">Qtd duplo</th>
            <th className="p-2 text-left">Garantia</th>
            <th className="p-2 text-left">Data de criação</th>
            <th className="p-2 text-left">Data de recebimento</th>
            {isReceivedList && <th className="p-2 text-left">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {packages?.map((p) => (
            <tr className="border-b" key={String(p.id)}>
              <td className="p-2">{p.qtdSimples}</td>
              <td className="p-2">{p.qtdDuplo}</td>
              <td className="p-2">{p.garantia ? "Sim" : "Não"}</td>
              <td className="p-2">{formatDate(p.createdAt)}</td>
              <td className="p-2">{formatDate(p.recebidoEm) ?? "-"}</td>
              <td className="p-2 flex gap-2">
                {isReceivedList ? (
                  <Button
                    onClick={() => handleConfirmPackage(p.id)}
                    color="success"
                  >
                    <Check size={20} />
                  </Button>
                ) : (
                  <>
                    {!p.recebidoEm ? (
                      <>
                        <Button
                          onClick={() => handleDeletePackage(p.id)}
                          color="danger"
                        >
                          <Trash size={20} />
                        </Button>
                        <Button
                          onClick={() => {
                            navigate(`/packages/edit/${p.id}`, {
                              state: {
                                package: p,
                              },
                            });
                          }}
                        >
                          <Edit size={20} />
                        </Button>
                      </>
                    ) : null}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Title>Malotes</Title>
        <Link to="/packages/new">
          <Button>Novo Malote</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <PackageTable
          packages={data?.received}
          isReceivedList
          title="Malotes Recebidos"
        />
        <PackageTable packages={data?.sended} title="Malotes Enviados" />
      </div>
    </Container>
  );
}

export default Packages;
