import Title from "../../components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../components/Input";
import Select from "../../components/Select";

const createSectionSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  idFilial: z.number().min(1, "Filial é obrigatória"),
});

export default function CreateSection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(createSectionSchema),
    values: {
      nome: "",
    },
  });

  const { data: filials = [] } = useQuery({
    queryKey: ["filials"],
    queryFn: async () => {
      const response = await http.get("/filial");
      return response.data;
    },
  });

  const { mutate: createSection } = useMutation({
    mutationFn: async (values) => {
      const response = await http.post("/carteira", values);
      return response.data;
    },
    onSuccess: () => {
      navigate("/sections");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  function onSubmit(data) {
    createSection({
      nome: data.nome,
      idFilial: data.idFilial,
    });
  }

  const filialsOptions = filials?.map((filial) => ({
    label: filial.nome,
    value: filial.id,
  }));

  return (
    <Container>
      <Title>Nova Carteira</Title>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Nome"
            error={errors.nome?.message}
            {...register("nome")}
          />

          <div className="flex-1">
            <Controller
              control={control}
              name="idFilial"
              render={({ field: { onChange, value } }) => (
                <Select
                  options={filialsOptions}
                  placeholder="Filial"
                  onChange={(option) => {
                    onChange(option.value);
                  }}
                  value={filialsOptions?.find((v) => v.value === value)}
                />
              )}
            />
            {errors?.idFilial && (
              <span className="text-red-500 font-semibold mt-2">
                {errors?.idFilial?.message}
              </span>
            )}
          </div>
        </div>

        <Button type="submit">Criar Carteira</Button>
      </form>
    </Container>
  );
}
