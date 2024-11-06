import { useMutation } from "@tanstack/react-query";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { UsersForm } from "../../components/UsersForm";
import { http } from "../../services/http";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();

  const { mutate: createUser } = useMutation({
    mutationFn: async (values) => {
      const response = await http.post("/user", values);

      return response.data;
    },
    onSuccess: () => {
      navigate("/users");
    },
  });

  return (
    <Container>
      <Title>Novo usuário</Title>

      <UsersForm onSubmit={createUser} />
    </Container>
  );
}

export default CreateUser;
