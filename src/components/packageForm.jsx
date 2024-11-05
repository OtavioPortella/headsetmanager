import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { http } from "../services/http";
import Input from "./Input";
import Select from "./Select";
import Button from "./button";

const newPackageFormScheme = z.object({
  id: z.number().optional(),
  qtdSimples: z.coerce.number(),
  qtdDuplo: z.coerce.number(),
  garantia: z.boolean(),
  filialOrigemId: z.number().min(1, "Informe a filial de origem"),
  filialDestinoId: z.number().min(1, "Informe a filial de destino"),
});

export function PackageForm({ onSubmit, defaultValues }) {
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
    values: defaultValues ?? {
      qtdSimples: 0,
      qtdDuplo: 0,
      garantia: false,
      filialOrigemId: 0,
      filialDestinoId: 0,
    },
    resolver: zodResolver(newPackageFormScheme),
  });

  const errors = formMethods.formState.errors;

  if (isLoadingFilials) {
    return <span className="text-lg">Carregando dados...</span>;
  }

  return (
    <form
      className="flex items-center mt-8 flex-col gap-4"
      onSubmit={formMethods.handleSubmit((values) => {
        onSubmit(values);
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
  );
}
