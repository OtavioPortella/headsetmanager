import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/button";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Users() {
  const queryClient = useQueryClient();

  const { user } = useAuth();

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
        {user?.perfil?.podeCriarUsuario && (
          <Link to="/users/new">
            <Button>Novo Usuário</Button>
          </Link>
        )}
      </div>

      {user?.perfil?.admin && (
        <div className="mt-4">
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
      )}

      <div className="mt-4">
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
            {users.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="p-2">{employee.id}</td>
                <td className="p-2">{employee.nome}</td>
                <td className="p-2">{employee.matricula}</td>
                <td className="p-2">{employee.carteira?.nome}</td>
                <td className="p-2">{employee?.carteira?.filial?.nome}</td>
                <td className="p-2">{employee.perfil?.nome}</td>
                <td className="p-2">
                  {user?.perfil?.admin && (
                    <Button
                      onClick={() => handleDeleteUser(employee.id)}
                      color="danger"
                    >
                      Excluir
                    </Button>
                  )}
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
