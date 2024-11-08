import Title from "../../components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import { PackageForm } from "../../components/packageForm";

export default function NewHead() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createPackage } = useMutation({
    mutationFn: async (values) => {
      const response = await http.post("/malote", values);

      return response.data;
    },
    onSuccess: () => {
      navigate("/packages");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  return (
    <Container>
      <Title>Novo malote</Title>

      <PackageForm onSubmit={createPackage} />
    </Container>
  );
}
