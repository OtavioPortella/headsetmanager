import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";

function Recebidos() {
  const { data: packages } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await http.get("/malote");

      return response.data;
    },
  });

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Title>Malotes</Title>
        <Link to="/packages/new">
          <Button>Novo Malote</Button>
        </Link>
      </div>

      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Quantidade simples</th>
              <th className="p-2 text-left">Quantidade duplo</th>
              <th className="p-2 text-left">Garantia</th>
              <th className="p-2 text-left">Data de envio</th>
              <th className="p-2 text-left">Data de recebimento</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {packages?.map((p) => (
              <tr className="border-b" key={String(p.id)}>
                <td className="p-2">{p.qtdSimples}</td>
                <td className="p-2">{p.qtdDuplo}</td>
                <td className="p-2">{p.garantia ? "Sim" : "Não"}</td>
                <td className="p-2">{p.createdAt}</td>
                <td className="p-2">
                  {p.recebidoEm ? p.recebidoEm : "Não recebido"}
                </td>
                <td className="p-2 flex gap-2">
                  <Button>Editar</Button>
                  <Button>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Recebidos;
