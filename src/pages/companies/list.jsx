import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";

function Companies() {
  const queryClient = useQueryClient();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await http.get("/filial");

      return response.data;
    },
  });

  const { mutate: deleteCompany } = useMutation({
    mutationFn: async (id) => {
      await http.delete(`/filial/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  function handleDeleteCompany(id) {
    if (!confirm("Tem certeza que deseja excluir esta filial?")) {
      return;
    }

    deleteCompany(id);
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Title>Filiais</Title>
        <Link to="/companies/new">
          <Button>Nova Filial</Button>
        </Link>
      </div>

      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Estoque Simples</th>
              <th className="p-2 text-left">Estoque Duplo</th>
              <th className="p-2 text-left">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company) => (
              <tr className="border-b" key={String(company.id)}>
                <td className="p-2">{company.nome}</td>
                <td className="p-2">{company.estoqueSimples}</td>
                <td className="p-2">{company.estoqueDuplo}</td>
                <td className="p-2">{`${company.endereco.rua}, ${company.endereco.numero}`}</td>
                <td className="p-2 flex gap-2">
                  <Link
                    to={`/companies/edit/${company.id}`}
                    state={{ company }}
                  >
                    <Button>Editar</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteCompany(company.id)}
                    color="danger"
                  >
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

export default Companies;
