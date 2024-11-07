import Title from "../../components/Title";
import CompanyForm from "../../components/CompanyForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import Container from "../../components/Container";

function EditCompany() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state } = useLocation();

  const { mutate: updateCompany } = useMutation({
    mutationFn: async (data) => {
      await http.put(`/filial/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate("/companies");
    },
  });

  function onSubmit(data) {
    updateCompany(data);
  }
  return (
    <Container>
      <Title>Editar Filial</Title>

      <CompanyForm onSubmit={onSubmit} defaultValues={state.company} />
    </Container>
  );
}

export default EditCompany;
