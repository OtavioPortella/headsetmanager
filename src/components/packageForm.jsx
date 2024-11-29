import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { http } from "../services/http";
import Input from "./Input";
import Select from "./Select";
import Button from "./button";
import { useAuth } from "../contexts/AuthContext";

const newPackageFormScheme = z
  .object({
    id: z.number().optional(),
    qtdSimples: z.coerce.number(),
    qtdDuplo: z.coerce.number(),
    garantia: z.boolean(),
    filialDestinoId: z.number().min(1, "Informe a filial de destino"),
  })
  .superRefine((values, ctx) => {
    if (values.qtdSimples === 0 && values.qtdDuplo === 0) {
      ctx.addIssue({
        message: "O malote deve conter ao menos um head",
        path: ["qtdSimples"],
        code: z.ZodIssueCode.custom,
      });
    }
  });

export function PackageForm({ onSubmit, defaultValues }) {
  const { data: filials = [], isPending: isLoadingFilials } = useQuery({
    queryKey: ["filials"],
    queryFn: async () => {
      const response = await http.get("/filial");

      return response.data ?? [];
    },
  });

  const { user } = useAuth();

  const filialsOptions = filials
    ?.filter((f) => f.id !== user?.carteira?.filial?.id)
    ?.map((filial) => ({
      label: filial.nome,
      value: filial.id,
    }));

  const { register, ...formMethods } = useForm({
    values: defaultValues ?? {
      qtdSimples: 0,
      qtdDuplo: 0,
      garantia: false,
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
            name="filialDestinoId"
            render={({ field: { onChange, value } }) => (
              <Select
                options={filialsOptions}
                placeholder="Filial de destino"
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

      <Button type="submit">Confirmar</Button>
    </form>
  );
}
