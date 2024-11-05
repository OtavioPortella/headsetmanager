import Title from "../../components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { PackageForm } from "../../components/packageForm";

export default function EditHead() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { state } = useLocation();

  const { mutate: updatePackage } = useMutation({
    mutationFn: async (values) => {
      const response = await http.put(`/malote/${values.id}`, values);

      return response.data;
    },
    onSuccess: () => {
      navigate("/packages");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  return (
    <Container>
      <Title>Editar malote</Title>

      <PackageForm onSubmit={updatePackage} defaultValues={state.package} />
    </Container>
  );
}
