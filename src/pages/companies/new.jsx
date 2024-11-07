import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { http } from "../../services/http";
import CompanyForm from "../../components/CompanyForm";

function NewCompany() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createCompany } = useMutation({
    mutationFn: async (data) => {
      await http.post("/filial", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate("/companies");
    },
  });

  function onSubmit(data) {
    createCompany(data);
  }

  return (
    <Container>
      <Title>Nova Filial</Title>

      <CompanyForm onSubmit={onSubmit} />
    </Container>
  );
}

export default NewCompany;
