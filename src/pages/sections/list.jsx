import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";
import { useState } from "react";

function Section() {
  const queryClient = useQueryClient();

  const { data: filials = [] } = useQuery({
    queryKey: ["filials"],
    queryFn: async () => {
      const response = await http.get("/filial");
      return response.data;
    },
  });

  const [selectedFilialId, setSelectedFilialId] = useState(null);

  const { data: sections = [] } = useQuery({
    queryKey: ["sections", selectedFilialId],
    queryFn: async () => {
      const response = await http.get("/carteira", {
        params: {
          filialId: selectedFilialId,
        },
      });
      return response.data;
    },
  });

  const { mutate: deleteSection } = useMutation({
    mutationFn: async (id) => {
      await http.delete(`/carteira/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  function handleDeleteSection(id) {
    if (!confirm("Tem certeza que deseja excluir esta carteira?")) {
      return;
    }

    deleteSection(id);
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Title>Carteiras</Title>
        <Link to="/sections/new">
          <Button>Nova Carteira</Button>
        </Link>
      </div>

      <div className="my-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedFilialId(e.target.value || null)}
        >
          <option value="">Todas as filiais</option>
          {filials.map((filial) => (
            <option key={filial.id} value={filial.id}>
              {filial.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Quantidade de Usuários</th>
              <th className="p-2 text-left">Filial</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section.id} className="border-b">
                <td className="p-2">{section.id}</td>
                <td className="p-2">{section.nome}</td>
                <td className="p-2">{section.usuarios?.length || 0}</td>
                <td className="p-2">{section.filial?.nome}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDeleteSection(section.id)}
                      color="danger"
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Section;
