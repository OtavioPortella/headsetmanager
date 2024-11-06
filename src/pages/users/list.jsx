import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";
import { useState } from "react";

function Users() {
  const queryClient = useQueryClient();

  const { data: filials = [] } = useQuery({
    queryKey: ["filials"],
    queryFn: async () => {
      const response = await http.get("/filial");
      return response.data;
    },
  });

  const [selectedFilialId, setSelectedFilialId] = useState(null);

  const { data: users = [] } = useQuery({
    queryKey: ["users", selectedFilialId],
    queryFn: async () => {
      const response = await http.get("/user", {
        params: {
          idFilial: selectedFilialId,
        },
      });
      return response.data.users;
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id) => {
      await http.delete(`/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  function handleDeleteUser(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) {
      return;
    }

    deleteUser(id);
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Title>Usuários</Title>
        <Link to="/users/new">
          <Button>Novo Usuário</Button>
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
              <th className="p-2 text-left">Matricula</th>
              <th className="p-2 text-left">Carteira</th>
              <th className="p-2 text-left">Filial</th>
              <th className="p-2 text-left">Perfil</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.nome}</td>
                <td className="p-2">{user.matricula}</td>
                <td className="p-2">{user.carteira?.nome}</td>
                <td className="p-2">{user?.carteira?.filial?.nome}</td>
                <td className="p-2">{user.perfil?.nome}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button onClick={() => handleDeleteUser(user.id)}>
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

export default Users;
