import Button from "../../components/button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Title from "../../components/Title";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";

const newPackageFormScheme = z.object({
  qtdSimples: z.coerce.number(),
  qtdDuplo: z.coerce.number(),
  garantia: z.boolean(),
  filialOrigemId: z.number().min(1, "Informe a filial de origem"),
  filialDestinoId: z.number().min(1, "Informe a filial de destino"),
});

export default function NewHead() {
  const { data: filials = [], isPending: isLoadingFilials } = useQuery({
    queryKey: ["filials"],
    queryFn: async () => {
      const response = await http.get("/filial");

      return response.data ?? [];
    },
  });

  const filialsOptions = filials?.map((filial) => ({
    label: filial.nome,
    value: filial.id,
  }));

  const { register, ...formMethods } = useForm({
    values: {
      qtdSimples: 0,
      qtdDuplo: 0,
      garantia: false,
      filialOrigemId: 0,
      filialDestinoId: 0,
    },
    resolver: zodResolver(newPackageFormScheme),
  });
  const navigate = useNavigate();

  const errors = formMethods.formState.errors;

  const queryClient = useQueryClient();

  const { mutate: createPackage } = useMutation({
    mutationFn: async () => {
      const response = await http.post("/malote", formMethods.getValues());

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

      {isLoadingFilials && (
        <span className="text-lg">Carregando filiais...</span>
      )}

      <form
        className="flex items-center mt-8 flex-col gap-4"
        onSubmit={formMethods.handleSubmit((values) => {
          createPackage(values);
        })}
      >
        <div className="flex gap-12">
          <Input
            label="Quantidade simples"
            className="mt-1"
            placeholder="Quantidade simples"
            {...register("qtdSimples")}
            type="number"
            error={formMethods.formState.errors?.qtdSimples?.message}
          />
          <Input
            className="mt-1"
            placeholder="Quantidade duplo"
            label="Quantidade duplo"
            {...register("qtdDuplo")}
            type="number"
            error={formMethods.formState.errors?.qtdDuplo?.message}
          />
        </div>

        <div className="flex gap-12">
          <div>
            <Controller
              control={formMethods.control}
              name="filialOrigemId"
              render={({ field: { onChange, value } }) => (
                <Select
                  options={filialsOptions}
                  placeholder="Filial de origem"
                  onChange={(option) => {
                    onChange(option.value);
                  }}
                  value={filialsOptions?.find((v) => v.value === value)}
                />
              )}
            />
            {errors?.filialOrigemId && (
              <span className="text-red-500 font-semibold mt-2">
                {errors?.filialOrigemId?.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              control={formMethods.control}
              name="filialDestinoId"
              render={({ field: { onChange, value } }) => (
                <Select
                  options={filialsOptions}
                  placeholder="Filial de origem"
                  onChange={(option) => {
                    onChange(option.value);
                  }}
                  value={filialsOptions?.find((v) => v.value === value)}
                />
              )}
            />
            {errors?.filialDestinoId && (
              <span className="text-red-500 font-semibold mt-2">
                {errors?.filialDestinoId?.message}
              </span>
            )}
          </div>
        </div>

        <label className="flex gap-1">
          <span className="font-bold text-lg">Em prazo de garantia?</span>
          <input type="checkbox" {...register("garantia")} />
        </label>

        <Button type="submit">Registrar</Button>
      </form>
    </Container>
  );
}
